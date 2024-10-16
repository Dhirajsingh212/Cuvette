import { Request, Response } from "express";
import { prisma } from "../db/db";
import { otpSchema, userSchema } from "../types";
import { genToken } from "../utils";
import { generateOTP, sendVerificationEmail } from "../utils/mailService";
import { client } from "../utils/numberService";

export async function LoginFunction(req: Request, res: Response) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(404).json({
        success: false,
        message: "Incomplete details",
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        companyEmail: email,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or wrong credentials",
      });
    }

    const token = genToken(user?.id, user?.name);
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        success: true,
        message: "successfull",
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function SignupFunction(req: Request, res: Response) {
  try {
    const parsedData = userSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "Incomplete fields",
      });
    }
    const otp = generateOTP();

    const { name, companyEmail, companyName, employeeSize, phoneNumber } =
      parsedData.data;
    const newUser = await prisma.user.create({
      data: {
        name: name,
        companyEmail,
        companyName,
        employeeSize,
        phoneNumber: phoneNumber,
        mobileOtp: Number(otp),
        emailOtp: Number(otp),
      },
    });

    await sendVerificationEmail(companyEmail, Number(otp));

    client.messages
      .create({
        body: `${otp}`,
        from: "+18644028672",
        to: `+91${phoneNumber}`,
      })
      .then((message) => console.log(message.sid));

    const token = genToken(newUser.id, newUser.name);

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({
        success: true,
        message: "successfull",
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function VerifyOTPFunction(req: Request, res: Response) {
  try {
    const parsedData = otpSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "Incomplete fields",
      });
    }

    const { mobileOtp, emailOtp, userId } = parsedData.data;

    const userData = await prisma.user.findFirst({
      where: {
        id: userId,
        mobileOtp: Number(mobileOtp),
        emailOtp: Number(emailOtp),
      },
    });

    if (!userData) {
      return res.status(401).json({
        success: false,
        message: "Wrong otp",
      });
    }

    await prisma.user.updateMany({
      where: {
        id: userId,
      },
      data: {
        otpVerified: true,
        emailVerified: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "successfull",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function LogoutFunction(req: Request, res: Response) {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function GetVerficationDetails(req: Request, res: Response) {
  try {
    const { userId } = req.body;

    const userDetails = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        otpVerified: true,
        emailVerified: true,
        companyEmail: true,
        phoneNumber: true,
      },
    });

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: false,
      userData: userDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
