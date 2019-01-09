
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import ClickOutside from 'react-click-outside'
import Link from 'sw-valuelink'

import cssModules from 'react-css-modules'
import styles from './DropDown.scss'

import toggle from 'decorators/toggle'
import Input from 'components/forms/Input/Input'


@toggle()
@cssModules(styles, { allowMultiple: true })
export default class DropDown extends Component {

  static propTypes = {
    initialValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    selectedValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
    })),
    selectedItemRender: PropTypes.func,
    itemRender: PropTypes.func,
    onSelect: PropTypes.func,
    isToggleActive: PropTypes.bool.isRequired, // @toggle
    toggleOpen: PropTypes.func.isRequired, // @toggle
    toggleClose: PropTypes.func.isRequired, // @toggle
  }

  constructor({ initialValue, selectedValue }) {
    super()
    this.state = {
      selectedValue: initialValue || selectedValue || 0,
      itemsFiltered:[],
      searchValue:'',
    }
  }

  toggle = () => {
    const { isToggleActive, toggleOpen, toggleClose } = this.props

    if (isToggleActive) {
      this.setState({
        searchValue:'',
      })
      toggleClose()
    }
    else {
      toggleOpen()
    }
  }

  handleOptionClick = (item) => {
    const { toggleClose, selectedValue, onSelect } = this.props

    this.setState({
      searchValue:'',
    })
    // if there is no passed `selectedValue` then change it
    if (typeof selectedValue === 'undefined') {
      this.setState({
        selectedValue: item.value,
        itemsFiltered:this.props.items,
      })
    }

    // for example we'd like to change `selectedValue` manually
    if (typeof onSelect === 'function') {
      onSelect(item)
    }

    toggleClose()
  }

  renderSelectedItem = () => {
    const { items, selectedItemRender } = this.props

    const selectedValue = typeof this.props.selectedValue !== 'undefined' ? this.props.selectedValue : this.state.selectedValue
    const selectedItem = items.find(({ value }) => value === selectedValue)

    if (typeof selectedItemRender === 'function') {
      return selectedItemRender(selectedItem)
    }

    return selectedItem.title
  }
  handleChange = (value) => {
    if (value === '' || value === undefined) {
      this.setState({
        itemsFiltered:this.props.items,
        searchValue:'',
      })
    } else {
      this.setState({
        searchValue: value.toUpperCase(),
        itemsFiltered:this.props.items.filter(item => item.name.includes(value.toUpperCase())),
      })
    }
  }

  renderItem = (item) => {
    const { itemRender } = this.props

    if (typeof itemRender === 'function') {
      return itemRender(item)
    }

    return item.title
  }

  render() {
    const { className, items, isToggleActive } = this.props
    const { searchValue } = this.setState

    const dropDownStyleName = cx('dropDown', {
      'active': isToggleActive,
    })

    const linkedValue = Link.all(this, 'inputValue')

    linkedValue.inputValue.check((value) => this.handleChange(value))

    return (
      <ClickOutside
        onClickOutside={isToggleActive
          ? () => {
            this.refs.searchInput.handleBlur()
            linkedValue.inputValue.set('')
            this.toggle()
          }
          : () => {}
        }
      >
        <div styleName={dropDownStyleName} className={className}>
          <div styleName="selectedItem" onClick={this.toggle}>
            <div styleName="arrow" />
            {isToggleActive ? (
              <Input
                styleName="searchInput"
                focusOnInit
                valueLink={linkedValue.inputValue}
                ref="searchInput"
              />
            ) : (
              this.renderSelectedItem()
            )}
          </div>
          {
            isToggleActive && (
              <div styleName="select">
                {isToggleActive && this.state.searchValue.length ? (
                  this.state.itemsFiltered.map((item) => (
                    <div
                      key={item.value}
                      styleName="option"
                      onClick={() => {
                        linkedValue.inputValue.set('')
                        this.handleOptionClick(item)}
                      }
                    >
                      {this.renderItem(item)}
                    </div>
                  ))
                ) : (
                  items.map((item) => (
                    <div
                      key={item.value}
                      styleName="option"
                      onClick={() => this.handleOptionClick(item)}
                    >
                      {this.renderItem(item)}
                    </div>
                  ))
                )}
              </div>
            )
          }
        </div>
      </ClickOutside>
    )
  }
}
