
import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface SkillDataPoint {
  skill: string;
  requiredLevel: number;
  yourLevel: number;
}

interface SkillsRadarChartProps {
  skills: SkillDataPoint[];
}

// This simulates what would be done with a real chart library
const SkillsRadarChart: React.FC<SkillsRadarChartProps> = ({ skills }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  const size = isMobile ? 260 : 300;

  useEffect(() => {
    if (!chartRef.current) return;
    
    // In a real implementation, we would use a library like Chart.js or Recharts
    // This is a simplified visual representation
    const drawSimulatedChart = () => {
      const container = chartRef.current!;
      container.innerHTML = '';
      
      const centerX = size / 2;
      const centerY = size / 2;
      const maxRadius = (size / 2) - 30;
      
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", String(size));
      svg.setAttribute("height", String(size));
      
      // Draw the background circles (levels)
      for (let i = 1; i <= 5; i++) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", String(centerX));
        circle.setAttribute("cy", String(centerY));
        circle.setAttribute("r", String((i / 5) * maxRadius));
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", "#e5e7eb");
        circle.setAttribute("stroke-width", "1");
        svg.appendChild(circle);
      }
      
      // Draw the axes
      const numSkills = skills.length;
      const angleStep = (2 * Math.PI) / numSkills;
      
      for (let i = 0; i < numSkills; i++) {
        const angle = i * angleStep;
        const x = centerX + Math.cos(angle) * maxRadius;
        const y = centerY + Math.sin(angle) * maxRadius;
        
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", String(centerX));
        line.setAttribute("y1", String(centerY));
        line.setAttribute("x2", String(x));
        line.setAttribute("y2", String(y));
        line.setAttribute("stroke", "#e5e7eb");
        line.setAttribute("stroke-width", "1");
        svg.appendChild(line);
        
        // Add skill labels
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        const labelX = centerX + Math.cos(angle) * (maxRadius + 15);
        const labelY = centerY + Math.sin(angle) * (maxRadius + 15);
        text.setAttribute("x", String(labelX));
        text.setAttribute("y", String(labelY));
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("font-size", "10");
        text.setAttribute("fill", "#6b7280");
        text.textContent = skills[i].skill;
        svg.appendChild(text);
      }
      
      // Draw the "Required" polygon
      const requiredPoints = skills.map((skill, i) => {
        const angle = i * angleStep;
        const distance = (skill.requiredLevel / 5) * maxRadius;
        return `${centerX + Math.cos(angle) * distance},${centerY + Math.sin(angle) * distance}`;
      }).join(" ");
      
      const requiredPolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      requiredPolygon.setAttribute("points", requiredPoints);
      requiredPolygon.setAttribute("fill", "rgba(251, 191, 36, 0.2)");
      requiredPolygon.setAttribute("stroke", "rgb(251, 191, 36)");
      requiredPolygon.setAttribute("stroke-width", "1.5");
      svg.appendChild(requiredPolygon);
      
      // Draw the "Your Skills" polygon
      const yourPoints = skills.map((skill, i) => {
        const angle = i * angleStep;
        const distance = (skill.yourLevel / 5) * maxRadius;
        return `${centerX + Math.cos(angle) * distance},${centerY + Math.sin(angle) * distance}`;
      }).join(" ");
      
      const yourPolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      yourPolygon.setAttribute("points", yourPoints);
      yourPolygon.setAttribute("fill", "rgba(59, 130, 246, 0.2)");
      yourPolygon.setAttribute("stroke", "rgb(59, 130, 246)");
      yourPolygon.setAttribute("stroke-width", "1.5");
      svg.appendChild(yourPolygon);
      
      container.appendChild(svg);
    };
    
    drawSimulatedChart();
  }, [skills, size]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Skills Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div ref={chartRef} className="w-full flex justify-center" />
          
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm">Your Skills</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm">Required Skills</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsRadarChart;
