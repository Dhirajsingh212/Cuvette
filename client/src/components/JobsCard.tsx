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

export default function JobsCard({ job }: { job: any }) {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
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
          <span>$120,000 - $160,000 / year - {job.date}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Full-time</Badge>
          <Badge variant="secondary">React</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">Node.js</Badge>
          <Badge variant="secondary">{job.experience}</Badge>
        </div>
        <p className="text-sm text-gray-600 line-clamp-4">{job.description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
}
