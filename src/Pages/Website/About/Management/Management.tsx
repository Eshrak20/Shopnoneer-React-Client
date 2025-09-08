import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Team {
  number: number;
  title: string;
  // Add other properties if needed
}

interface ManagementProps {
  managementData: Team[];
}

const Management = ({ managementData }: ManagementProps) => {
  return (
    <div className="py-20 md:py-40 bg-background">
      <h1 className="text-5xl md:text-7xl font-extrabold text-center pb-10 md:pb-20 text-primary">
        আমাদের মূল দল
      </h1>
      <div className="md:-ml-44 md:mr-5">
        <div className="flex justify-center items-center">
          {/* Optional logo - uncomment if needed */}
          {/* <div>
            <img
              src={`${baseUrl}/logo2.png`}
              alt="logo"
              className="w-60 md:w-96 transform -rotate-90 mt-52 ml-20 hidden md:block"
            />
          </div> */}

          <Badge className="z-10 text-lg md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 shadow-md hidden md:inline-flex  rounded-lg transition-all duration-300 text-primary-foreground transform -rotate-90 px-10 py-7   -ml-72 ">
            ম্যানেজড বাই 
            <span className="ml-2">স্বপ্ননীড়</span>
          </Badge>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 md:gap-x-6">
            {managementData.map((team, index) => (
              <Card
                key={index}
                className="p-6 m-3 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <CardContent className="p-0">
                  <div className="text-4xl font-bold mb-2 text-primary">
                    {team.number < 10 ? `0${team.number}` : team.number}
                  </div>
                  <div className="text-lg font-semibold text-card-foreground mb-1">
                    {team.title}
                  </div>
                  <div className="text-sm text-muted-foreground">টিম</div>
                  <hr className="my-4 border-border" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Management;
