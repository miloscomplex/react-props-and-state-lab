import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = string => {
    return this.setState({
      filters: {
        ...this.state.filters,
        type: string
      }
    })

  }

  petsList = (data) => {
    //console.log(data);
    this.setState({
      pets: data
    })
  }

  onFindPetsClick = () => {
    if (this.state.filters.type === 'all' ) {
      fetch('/api/pets')
      .then(res => res.json())
      .then(data => this.petsList(data))
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(res => res.json())
      .then(data => this.petsList(data))
    }
  }

  onAdoptPet = id => {
    const newArr = this.state.pets.map( pet =>
      pet.id === id ? { ...pet, isAdopted: true } : pet
    )
    this.setState({ pets: newArr})
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser statePets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
