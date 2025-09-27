import BooksTable from "../components/BooksTable";
import CsvDownloader from "../components/CsvDownloader";
import CsvUploader from "../components/CsvUploader";
import PaginationControls from "../components/PaginationControls";
import SearchBar from "../components/SearchBar";

const index = () => {
  return (
    <section>
      <div className="flex space-x-2 items-center justify-center flex-wrap">
        <CsvUploader />
        <CsvDownloader />
      </div>
      <SearchBar />
      <BooksTable />
      <PaginationControls />
    </section>
  );
};

export default index;
