import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { dummyData } from "../data/data";

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
}

interface DataContextType {
  region: string;
  sex: string;
  platform: string;
  filteredData: Data[];
  handleRegionChange: (selectedRegion: string) => void;
  handleSexChange: (selectedSex: string) => void;
  handlePlatformChange: (selectedPlatform: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [region, setRegion] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Data[]>([]);

  useEffect(() => {
    filterData();
  }, [region, sex, platform]); // 종속성 배열에 region, sex, platform 추가

  const filterData = () => {
    const newData = dummyData.filter((item) => {
      return (
        (region === "" || item.region === region) &&
        (sex === "" || item.sex === sex) &&
        (platform === "" || item.platform === platform)
      );
    });
    setFilteredData(newData);
  };

  const handleRegionChange = (selectedRegion: string) => {
    setRegion(selectedRegion);
  };

  const handleSexChange = (selectedSex: string) => {
    setSex(selectedSex);
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
        handleRegionChange,
        handleSexChange,
        handlePlatformChange,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
