import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface CardFilterProps {
  filterState: string;
  handleChange: (event: SelectChangeEvent) => void;
  filters: string[];
}

const CardFilter: React.FC<CardFilterProps> = ({
  filterState,
  handleChange,
  filters,
}) => {
  return (
    <FormControl sx={{ width: "15%" }}>
      <InputLabel id="demo-simple-select-label">Filter</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={filterState}
        label="Filter"
        onChange={handleChange}
      >
        {filters.map((data) => (
          <MenuItem key={data} value={data}>
            {data}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CardFilter;
