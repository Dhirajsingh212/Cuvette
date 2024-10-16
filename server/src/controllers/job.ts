import { Request, Response } from "express";
import { prisma } from "../db/db";
import { jobSchema } from "../types";
import { sendCompanyDetails } from "../utils/mailService";

export async function CreateJobFunction(req: Request, res: Response) {
  try {
    const parsedData = jobSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: "Incomplete fields",
      });
    }

    const { date, description, emails, experience, title, userId } =
      parsedData.data;

    const userDetails = await prisma.user.findFirst({
      where: {
        id: userId,
        otpVerified: true,
        emailVerified: true,
      },
    });

    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "Not verified",
      });
    }

    const createdJob = await prisma.job.create({
      data: {
        userId,
        date: date?.toString() || "",
        description,
        experience,
        title,
        emails,
      },
    });

    await sendCompanyDetails(
      createdJob.emails,
      createdJob,
      userDetails.companyEmail
    );

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
