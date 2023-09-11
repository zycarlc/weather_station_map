import { Box, Checkbox, Autocomplete, TextField } from "@mui/material"

const statesAU = ["VIC", "SA", "NSW", "QLD"]
function FilterButton({ states, setStates }) {
    return (
        <div>
            <Box
                sx={{
                    position: "fixed",
                    top: "100px",
                    left: 10,
                    bgcolor: "rgba(50,154,233,0.3)",
                }}
            >
                <CheckboxesTags states={states} setStates={setStates} />
            </Box>
        </div>
    )
}
function CheckboxesTags({ states, setStates }) {
    let handleChange = (e, values) => {
        setStates(values)
    }

    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={statesAU}
            value={states}
            disableCloseOnSelect
            getOptionLabel={option => option}
            defaultChecked={states}
            renderOption={(props, option, data) => {
                return (
                    <li {...props}>
                        <Checkbox
                            style={{ marginRight: 8 }}
                            checked={data.selected}
                        />
                        {option}
                    </li>
                )
            }}
            style={{ minWidth: "150px" }}
            onChange={handleChange}
            renderInput={params => {
                return <TextField {...params} label="States" placeholder="" />
            }}
        />
    )
}

export default FilterButton
