import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

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
  const [date, setDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [region, setRegion] = useState<string>("0");
  const [sex, setSex] = useState<string>("0");
  const [platform, setPlatform] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams({
        region, // "1" for 서울, "2" for 경기, "0" for 모든 지역
        sex, // "-1" for 여자, "1" for 남자, "0" for 남녀 모두
        platform, // "plab", "with", "puzzle", "iam" 등의 값
      });

      const url = `http://localhost:8080/futsal-info/${date}?${queryParams}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network Error");
        }
        const data = await response.json();
        setFilteredData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [date, region, sex, platform]);

  const handleDateChange = (selectedDate: string) => setDate(selectedDate);
  const handleRegionChange = (selectedRegion: string) =>
    setRegion(selectedRegion);
  const handleSexChange = (selectedSex: string) => setSex(selectedSex);
  const handlePlatformChange = (selectedPlatform: string) =>
    setPlatform(selectedPlatform);

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
