import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import CounterContext from "./../context/counterContex";

export default function ResetButton() {
  const { onReset } = useContext(CounterContext);
  return (
    <div>
      <Button variant="contained" color="secondary" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
}
