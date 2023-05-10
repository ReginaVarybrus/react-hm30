import * as React from 'react';
import { useState, useEffect } from "react";
// import HttpFetchHeroes from "../hooks/HttpFetchHeroes";
import EnhancedTable from '../components/HeroesListTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacter } from '../store/slices/rickAndMorty';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const HttpHeroComponent = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const rowsPerPage = 20;
    const offSet = page * rowsPerPage;

    const heroes = useSelector((state) => state.rickmorty.listOfChar)
    const isLoading = useSelector((state) => state.rickmorty.isLoading)
    const error = useSelector((state) => state.rickmorty.error)
 
    useEffect(() => {
        dispatch(fetchCharacter(`character?page=${offSet / 20 + 1}`))
    }, [dispatch])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    if (error) {
        return error
    }

    return <div className="Main-div">
        <div>
            {isLoading ?
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box> :
                <EnhancedTable
                    data={heroes}
                    count={heroes.info?.count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                />}
        </div>
    </div>
}

export default HttpHeroComponent;
