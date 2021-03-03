import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  render() {
    return (
      <div className="ui cards">
        { this.props.statePets.map( petObj => <Pet pet={petObj} onAdoptPet={this.props.onAdoptPet} /> )}
      </div>
    )
  }
}

export default PetBrowser
