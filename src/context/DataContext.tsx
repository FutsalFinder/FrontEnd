import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import LoaindgScreen from "../components/LoadingScreen";

interface Data {
  title: string;
  time: string;
  sex: string;
  matchType: string;
  level: string;
  matchChar: string;
  region: string;
  platform: string;
  curCount: number;
  maxCount: number;
  link: string;
}

interface RegionMap {
  [key: string]: string;
}

interface SexMap {
  [key: string]: string;
}

interface DataContextType {
  region: string;
  sex: string;
  platform: string;
  filteredData: Data[];
  handleDateChange: (date: string) => void;
  handleRegionChange: (selectedRegion: string) => void;
  handleSexChange: (selectedSex: string) => void;
  handlePlatformChange: (selectedPlatform: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("Error");
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const koreanDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul",
  })
    .format(new Date())
    .replace(/\. /g, "-")
    .slice(0, -1);

  const [date, setDate] = useState<string>(koreanDate);
  const [region, setRegion] = useState<string>("0");
  const [sex, setSex] = useState<string>("0");
  const [platform, setPlatform] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams({
        region,
        sex,
        platform,
      });

      const url = `http://localhost:8080/futsal-info/${date}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network Error");
        }
        const rawData = await response.json();
        const transformedData = rawData.map((item: any) => ({
          title: item.match_title,
          time: item.time,
          sex: item.sex,
          matchType: item.match_type,
          level: item.level,
          matchChar: `${item.match_vs}vs${item.match_vs}`, // 예: '5'나 '6'으로 들어오면 '5vs5', '6vs6'으로 변환
          region: item.region,
          platform: item.platform,
          curCount: parseInt(item.cur_player, 10),
          maxCount: parseInt(item.max_player, 10),
          link: item.link,
        }));
        setFilteredData(transformedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [date, region, sex, platform]);

  if (isLoading) {
    return <LoaindgScreen />; // 로딩 상태일 때 로딩 스크린 표시
  }

  const handleDateChange = (selectedDate: string) => setDate(selectedDate);
  const handleRegionChange = (selectedRegion: string) => {
    const regionMap: RegionMap = {
      서울: "1",
      경기: "2",
      모든지역: "0",
    };
    setRegion(regionMap[selectedRegion] || "0");
  };

  const handleSexChange = (selectedSex: string) => {
    const sexMap: SexMap = { 남성: "1", 여성: "-1", 혼성: "0" };
    setSex(sexMap[selectedSex] || "0");
  };

  const handlePlatformChange = (selectedPlatform: string) => {
    setPlatform(selectedPlatform);
  };

  return (
    <DataContext.Provider
      value={{
        region,
        sex,
        platform,
        filteredData,
        handleDateChange,
        handleRegionChange,
        handleSexChange,
        handlePlatformChange,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
