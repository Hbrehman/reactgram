import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";

class Counter extends Component {
  state = {};

  render() {
    const { counter, onIncrement, onDelete, onDecrement } = this.props;
    const { value, name, stdClass } = counter;
    return (
      <div>
        <Grid container justify="center" alignItems="center" spacing={3}>
          <Grid item xs={1}>
            <Chip label={name} color="primary" />
          </Grid>

          <Grid item xs={1}>
            <Chip label={stdClass} color="primary" />
          </Grid>
          <Grid item xs={1}>
            <Chip
              label={value === 0 ? "Zero" : value}
              color={value === 0 ? "secondary" : "primary"}
            />
          </Grid>

          <Grid item xs={1}>
            <Button
              className="m-2"
              variant="contained"
              color="primary"
              onClick={() => onIncrement(this.props.id)}
            >
              +
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button
              className="m-2"
              variant="contained"
              color="primary"
              onClick={() => onDecrement(this.props.id)}
              disabled={value <= 0 ? true : false}
            >
              -
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button
              className="btn-sm m-2"
              variant="contained"
              color="secondary"
              onClick={() => onDelete(this.props.id)}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Counter;
