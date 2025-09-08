import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MissionItem {
  text: string;
}

interface MissionProps {
  missionData: MissionItem[];
}

const Mission: React.FC<MissionProps> = ({ missionData }) => {
  return (
    <div className="rounded-lg px-5 md:px-10 text-foreground transition-colors duration-500">
      {/* Section Title */}
      <h1 className="text-3xl md:text-7xl font-extrabold text-start mb-12 text-primary">
        আমাদের লক্ষ্য
      </h1>

      {/* Mission List */}
      <div className="space-y-10">
        {missionData.map((mission, index) => (
          <Card
            key={index}
            className="animated-border-2 card-hover-glow relative flex flex-col space-y-4 p-6 rounded-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <CardContent className="p-0">
              <span></span> {/* Required for pseudo-elements */}
              
              {/* Mission Text */}
              <p className="2xl:text-2xl md:text-xl text-lg font-medium text-card-foreground">
                <Badge className="mr-2 bg-primary text-primary-foreground">{`0${index + 1}`}</Badge>
                {mission.text}
              </p>

              {/* Divider */}
              <div className="border-b border-border w-full mt-4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Mission;