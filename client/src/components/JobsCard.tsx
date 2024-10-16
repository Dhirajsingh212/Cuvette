import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, DollarSign } from "lucide-react";

export default function JobsCard() {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Senior React Developer
        </CardTitle>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Building2 className="h-4 w-4" />
          <span>TechCorp Inc.</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2 text-sm">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span>San Francisco, CA (Remote)</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <DollarSign className="h-4 w-4 text-gray-500" />
          <span>$120,000 - $160,000 / year</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Full-time</Badge>
          <Badge variant="secondary">React</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">Node.js</Badge>
        </div>
        <p className="text-sm text-gray-600">
          We are seeking an experienced React developer to join our dynamic
          team. The ideal candidate will have a strong background in building
          scalable web applications using modern JavaScript frameworks.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
}
