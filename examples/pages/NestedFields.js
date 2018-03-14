import React from 'react'
import PropTypes from 'prop-types'

/* eslint-disable import/no-extraneous-dependencies */
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'
import Checkbox from 'material-ui/Checkbox'
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from 'material-ui/Form'
import Radio, { RadioGroup } from 'material-ui/Radio'
/* eslint-enable import/no-extraneous-dependencies */

import Input, { InputLabel } from 'material-ui/Input'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'

import Form from '../../src/index'
import styles from '../styles'


const formControlStyle = {
  padding: 'inherit',
  margin: 'inherit',
  display: 'inherit',
  border: 'inherit',
}

@withStyles(styles)
export default class NestedFields extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    onSubmitValues: null,
  }

  submit = (values, pristineValues) => {
    // eslint-disable-next-line no-console
    console.log('submit values:', values, 'pristine values:', pristineValues)
    this.setState({ onSubmitValues: values })
  }

  render() {
    const { classes } = this.props

    return (
      <Grid
        container
        direction="row"
        wrap="nowrap"
      >
        <Grid item xs className={classes.gridItem}>
          <Form onSubmit={this.submit}>
            <TextField
              label="Name"
              type="text"
              name="name"
              value=""
              data-validators="isRequired,isAlpha"
              fullWidth
            />

            <fieldset>
              <legend>FormControl Select</legend>
              <FormControl required>
                <InputLabel htmlFor="age-helper">Age</InputLabel>
                <Select
                  value=""
                  name="age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Teens</MenuItem>
                  <MenuItem value={20}>Twenties</MenuItem>
                  <MenuItem value={30}>Thirties</MenuItem>
                  <MenuItem value="40+">Fourties +</MenuItem>
                </Select>
                <FormHelperText>Some important helper text</FormHelperText>
              </FormControl>

              <fieldset>
                <legend>TextField native select</legend>
                <TextField
                  select
                  label="Years left"
                  name="yearsLeft"
                  value="a lot"
                  margin="normal"
                  SelectProps={{ native: true }}
                  fullWidth
                >
                  <option value="a lot">A lot</option>
                  <option value="not many">Not many</option>
                </TextField>

                <fieldset>
                  <legend>FormControlLabel and plain Checkbox</legend>
                  <FormControlLabel
                    control={<Checkbox checked={false} name="use1" value="wisely" />}
                    label="I will use them wisely"
                  />

                  <Checkbox checked name="use2" value="awesomely" />
                  <span>I will use them awesomely</span>

                  <FormControl
                    component="fieldset"
                    style={formControlStyle}
                    required
                  >
                    <FormLabel component="legend">
                      RadioGroup FormControl
                    </FormLabel>
                    <RadioGroup
                      name="certainty"
                      value=""
                    >
                      <FormControlLabel
                        value="high"
                        control={<Radio />}
                        label="I swear"
                      />
                      <FormControlLabel
                        value="soso"
                        control={<Radio />}
                        label="Probably"
                      />
                      <FormControlLabel
                        value="low"
                        control={<Radio />}
                        label="Maybe"
                      />
                    </RadioGroup>
                  </FormControl>
                </fieldset>
              </fieldset>
            </fieldset>
            <Button variant="raised" type="submit">Submit</Button>
          </Form>
        </Grid>
        <Grid item xs className={classes.gridItem}>
          <pre>
            {this.state.onSubmitValues &&
              JSON.stringify(this.state.onSubmitValues, null, 2)
            }
          </pre>
        </Grid>
      </Grid>
    )
  }
}