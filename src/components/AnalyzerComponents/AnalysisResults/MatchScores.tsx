
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "../../ui/card";
import { CustomProgress } from "../../ui/custom-progress";

interface MatchScore {
  category: string;
  score: number;
  icon: React.ReactNode;
}

interface MatchScoresProps {
  scores: MatchScore[];
  overallScore: number;
}

const MatchScores: React.FC<MatchScoresProps> = ({ scores, overallScore }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Match Scores</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <div className="relative inline-block">
              <svg className="w-32 h-32">
                <circle
                  className="text-gray-200"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="58"
                  cx="64"
                  cy="64"
                />
                <circle
                  className={getScoreColor(overallScore)}
                  strokeWidth="8"
                  strokeDasharray={`${overallScore * 3.64} 364`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="58"
                  cx="64"
                  cy="64"
                />
              </svg>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <span className="text-3xl font-bold">{overallScore}%</span>
              </div>
            </div>
            <h3 className="mt-2 text-lg font-medium">Overall Match</h3>
          </div>

          <div className="space-y-4">
            {scores.map((score, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="mr-2">{score.icon}</div>
                    <span className="text-sm font-medium">{score.category}</span>
                  </div>
                  <span className={`text-sm font-medium ${getScoreText(score.score)}`}>
                    {score.score}%
                  </span>
                </div>
                <CustomProgress 
                  value={score.score} 
                  className="h-2"
                  indicatorClassName={getScoreColor(score.score)}
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchScores;
