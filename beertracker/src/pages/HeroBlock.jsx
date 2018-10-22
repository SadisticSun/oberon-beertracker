import { Hero, HeroBody, Title } from "bloomer";
import SearchInput from "../components/SearchInput";
import UserLocationButton from "../components/UserLocationButton";
import * as PropTypes from "prop-types";
import React from "react";

export function HeroBlock(props) {
    return <Hero isSize="medium">
        <HeroBody>
            <Title isSize={1}>Zoek brouwerijen in de buurt</Title>
            {/*<img className="" src="/img/biertjes.jpg" alt="Biertjes"/>*/}
            <SearchInput isLoading={props.loading} onChange={props.onChange}/>
            {props.hasLocation &&
            <UserLocationButton isLoading={props.loading} onClick={props.onClick}/>}
        </HeroBody>
        <div className="overlay"></div>
    </Hero>;
}

HeroBlock.propTypes = {
    loading: PropTypes.bool,
    onChange: PropTypes.func,
    hasLocation: PropTypes.object,
    onClick: PropTypes.func
};
