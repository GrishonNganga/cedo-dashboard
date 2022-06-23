import React, { useEffect, lazy, useState } from "react";
import { useLocation, Route, Switch } from 'react-router-dom'

import { Navbar } from '../components/Navbar/OnboardingNavbar'

const Onboarding = () => {
    const location = useLocation()
    const OnboardingOne = lazy(() => import('./OnboardingOne'))
    const OnboardingTwo = lazy(() => import('./OnboardingTwo'))
    const [step, setStep] = useState(null)

    useEffect(() => {
        if (location) {
            const currentStep = location.pathname.split("-")[1]
            setStep(parseInt(currentStep))
        }
    }, [location])

    return (
        <div className="w-full flex flex-col h-screen">
            <Navbar />
            <Switch>
                <Route exact={true} path={`/onboarding/step-1`} component={OnboardingOne} />
                <Route exact={true} path={`/onboarding/step-2`} component={OnboardingTwo} />
            </Switch>
        </div>
    )
}

export default Onboarding;