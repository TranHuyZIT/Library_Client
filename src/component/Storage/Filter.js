import { Paper } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import { getBookGenres } from "../../utils/apiRequest";

export default function Filter({ setState }) {
  const [allGenres, setAllGenres] = useState([]);
  useEffect(() => {
    getBookGenres(setAllGenres);
  }, []);
  const handleFilter = (e, index) => {
    setState[index]((prev) => {
      if (prev.includes(e.target.name)) {
        return prev.filter((fil) => fil !== e.target.name);
      }
      return [...prev, e.target.name];
    });
  };

  return (
    <div className="filters-container">
      <Paper className="filter-container" elevation={2}>
        <div className="filter-heading">Giá</div>
        <div className="filter-content">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    handleFilter(e, 0);
                  }}
                  name="4 6"
                />
              }
              label="40.000 - 60.000"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    handleFilter(e, 0);
                  }}
                  name="6 8"
                />
              }
              label="60.000 - 80.000"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    handleFilter(e, 0);
                  }}
                  name="8 10"
                />
              }
              label="80.000 - 100.000"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    handleFilter(e, 0);
                  }}
                  name="10 00"
                />
              }
              label="> 100.000"
            />
          </FormGroup>
        </div>
      </Paper>
      <Paper className="filter-container" elevation={2}>
        <div className="filter-heading">Thể Loại</div>
        <div className="filter-content">
          <FormGroup>
            {allGenres.map((genre, index) => {
              return (
                <FormControlLabel
                  key={`genre-filter-${index}`}
                  control={
                    <Checkbox
                      name={genre.name}
                      onChange={(e) => {
                        handleFilter(e, 1);
                      }}
                    />
                  }
                  label={genre.name}
                />
              );
            })}
          </FormGroup>
        </div>
      </Paper>
    </div>
  );
}
