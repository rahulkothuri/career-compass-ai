
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

interface KeywordCategory {
  category: string;
  matching: string[];
  missing: string[];
}

interface KeywordComparisonProps {
  keywords: KeywordCategory[];
}

const KeywordComparison: React.FC<KeywordComparisonProps> = ({ keywords }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Keyword Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={keywords[0]?.category.toLowerCase() || "skills"}>
          <TabsList className="grid grid-cols-3 mb-4">
            {keywords.map(category => (
              <TabsTrigger 
                key={category.category} 
                value={category.category.toLowerCase()}
              >
                {category.category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {keywords.map(category => (
            <TabsContent 
              key={category.category} 
              value={category.category.toLowerCase()}
              className="space-y-4"
            >
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Matching Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {category.matching.length > 0 ? (
                    category.matching.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                        {keyword}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 italic">No matching keywords found</p>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Missing Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {category.missing.length > 0 ? (
                    category.missing.map((keyword, index) => (
                      <Badge key={index} variant="outline" className="border-red-200 text-red-800 bg-red-50 hover:bg-red-100">
                        {keyword}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 italic">No missing keywords found</p>
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default KeywordComparison;
