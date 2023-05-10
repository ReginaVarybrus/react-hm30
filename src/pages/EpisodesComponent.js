import { useState } from "react";
import HttpFetchEpisodes from "../hooks/HttpFetchEpisodes";
import EpisodesEnhancedTable from "../components/EpisodesListTable";

const EpisodesComponent = () => {
    const [page, setPage] = useState(0);
    const rowsPerPage = 20;
    const offSet = page * rowsPerPage;
    const { data, loading } = HttpFetchEpisodes(`episode?page=${offSet / 20 + 1}`);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return <div className="Main-div">
        <div>
            {loading ? <p>Loading...</p> :
                <EpisodesEnhancedTable
                    data={data}
                    count={data.info.count}
                    rowsPerPage={data.results.length}
                    page={page}
                    onPageChange={handleChangePage} />}
        </div>
    </div>
}

export default EpisodesComponent;