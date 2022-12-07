import { Paper } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function Filter({ setState }) {
  const handlePriceFilter = (e) => {
    setState[0]((prev) => {
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
              control={<Checkbox onChange={handlePriceFilter} name="4 6" />}
              label="40.000 - 60.000"
            />
            <FormControlLabel
              control={<Checkbox onChange={handlePriceFilter} name="6 8" />}
              label="60.000 - 80.000"
            />
            <FormControlLabel
              control={<Checkbox onChange={handlePriceFilter} name="8 10" />}
              label="80.000 - 100.000"
            />
            <FormControlLabel
              control={<Checkbox onChange={handlePriceFilter} name="10 00" />}
              label="> 100.000"
            />
          </FormGroup>
        </div>
      </Paper>
      <Paper className="filter-container" elevation={2}>
        <div className="filter-heading">Thể Loại</div>
        <div className="filter-content">
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Tài Chính" />
            <FormControlLabel control={<Checkbox />} label="Giáo Dục" />
            <FormControlLabel control={<Checkbox />} label="Truyện Tranh" />
            <FormControlLabel control={<Checkbox />} label="Tâm Lý" />
          </FormGroup>
        </div>
      </Paper>
    </div>
  );
}
