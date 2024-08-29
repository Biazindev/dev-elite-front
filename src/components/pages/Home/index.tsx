import Action from "../../Action"
import Adventure from "../../Adventure"
import Comedy from "../../Comedy"
import Drama from "../../Drama"
import Fiction from "../../Fiction"
import Header from "../../Header"
import Terror from "../../Terror"
import Animation from "../../Animation"
import Documentaries from "../../Documentaries"
import Western from "../../Western"
import Suspense from "../../Suspense"
import Fantasy from "../../Fantasy"

const Home = () => {
    return (
        <>
            <Header />
            <Action />
            <Adventure />
            <Animation />
            <Comedy />
            <Documentaries />
            <Drama />
            <Fantasy />
            <Western />
            <Fiction />
            <Suspense />
            <Terror />
        </>
    )
}

export default Home