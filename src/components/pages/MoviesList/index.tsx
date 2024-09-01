import Comedy from "../../Comedy"
import Drama from "../../Drama"
import Fiction from "../../Fiction"
import Header from "../../Header"
import Animation from "../../Animation"
import Documentaries from "../../Documentaries"
import Western from "../../Western"
import Suspense from "../../Suspense"
import Fantasy from "../../Fantasy"
import Action from "../../Action"

const MoviesList = () => {
    return (
        <>
            <Header />
            <Action />
            <Animation />
            <Comedy />
            <Documentaries />
            <Drama />
            <Fantasy />
            <Western />
            <Fiction />
            <Suspense />
        </>
    )
}

export default MoviesList
