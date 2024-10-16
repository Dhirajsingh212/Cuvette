import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center">
      <p className="text-4xl font-light text-gray-500">cuvette</p>
      <div className="flex flex-row gap-4 items-center pb-2">
        <p className="font-light text-gray-500 text-xl">contact</p>
        <a href="/">
          <Button>Signup</Button>
        </a>
      </div>
    </div>
  );
};

export default Header;
