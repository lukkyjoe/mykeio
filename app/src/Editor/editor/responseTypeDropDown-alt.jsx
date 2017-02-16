import React from 'react';

class ResponseTypeDropDown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: selected
    }
  }

    getInitialState() {
        var selected = this.getSelectedFromProps(this.props);
        return {
            selected: selected
        }
    }
    
    componentWillReceiveProps(nextProps) {
        var selected = this.getSelectedFromProps(nextProps);
        this.setState({
           selected: selected
        });
    }
    
    handleChange(e) {
        if (this.props.onChange) {
            var change = {
              oldValue: this.state.selected,
              newValue: e.target.value
            }
            this.props.onChange(change);
        }
        this.setState({selected: e.target.value});
    }

    getSelectedFromProps(props) {
        var selected;
        if (props.value === null && props.options.length !== 0) {
            selected = props.options[0][props.valueField];
        } else {
            selected = props.value;
        }
        return selected;
    }

    render() {
        var self = this;
        var options = self.props.options.map(function(option) {
            return (
                <option key={option[self.props.valueField]} value={option[self.props.valueField]}>
                    {option[self.props.labelField]}
                </option>
            )
        });
        return (
            <select id={this.props.id} 
                    className='form-control' 
                    value={this.state.selected} 
                    onChange={this.handleChange}>
                {options}
            </select>
        )
    }
}

export default ResponseTypeDropDown;