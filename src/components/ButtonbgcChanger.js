import { Button } from 'bootstrap'
import React from 'react'
import ThunderStorm from './ThunderStorm'

export default function ButtonbgcChanger() {

    const ThunderStorm = <ThunderStorm />

    return (

        <div>
                          <Button type="submit" variant="outline-info" onClick={ThunderStorm}>
                            Thunderstorm
                            </Button>
        </div>
    )
}
