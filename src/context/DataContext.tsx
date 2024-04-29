import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Loading from "../components/Loading";

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
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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
  const [data, setData] = useState<Data[]>([]);
  const [filteredData, setFilteredData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const url = `http://localhost:8080/futsal-info/${date}`;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network Error");
        const rawData = await response.json();
        const transformedData = rawData.map((item: any) => ({
          title: item.match_title,
          time: item.time,
          sex: item.sex,
          matchType: item.match_type,
          level: item.level,
          matchChar: `${item.match_vs}vs${item.match_vs}`,
          region: item.region,
          platform: item.platform,
          curCount: parseInt(item.cur_player),
          maxCount: parseInt(item.max_player),
          link: item.link,
        }));
        setData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다. ", error);
      }
    };

    fetchData();
  }, [date]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = data;

      if (sex === "남녀모두") {
        filtered = filtered.filter((item) => item.sex === "남녀모두");
      } else if (sex === "남자") {
        filtered = filtered.filter((item) => item.sex === "남자");
      } else if (sex === "여자") {
        filtered = filtered.filter((item) => item.sex === "여자");
      }

      if (platform === "Plab") {
        filtered = filtered.filter((item) => item.platform === platform);
      } else if (platform === "Puzzle") {
        filtered = filtered.filter((item) => item.platform === platform);
      } else if (platform === "With") {
        filtered = filtered.filter((item) => item.platform === platform);
      } else if (platform === "Iam") {
        filtered = filtered.filter((item) => item.platform === platform);
      }

      setFilteredData(filtered);
    };

    applyFilters();
  }, [data, sex, platform]);
  const handleDateChange = (selectedDate: string) => setDate(selectedDate);
  const handleRegionChange = (selectedRegion: string) =>
    setRegion(selectedRegion);
  const handleSexChange = (selectedSex: string) => setSex(selectedSex);
  const handlePlatformChange = (selectedPlatform: string) =>
    setPlatform(selectedPlatform);

  return (
    <>
      {loading ? <Loading /> : null}
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
    </>
  );
};
