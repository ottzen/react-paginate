import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = data.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
};
     
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
      setData(response.data);
      setTotalPages(Math.ceil(response.data.length / itemsPerPage))
    });
  }, []);

  console.log(data);

  return (
    <div className="App">
      <div>
        {subset.map((item) => (
            <div key={item.id}>{item.title}</div>
        ))}
        <ReactPaginate
            pageCount={totalPages}
            onPageChange={handlePageChange}
            forcePage={currentPage}
            previousLabel={"<<"}
            containerClassName={"pagination"}          
            nextLabel={">>"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
        />
      </div>
    </div>
  );
}

export default App;
