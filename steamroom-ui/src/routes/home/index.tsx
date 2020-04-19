import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";

const Home: FunctionalComponent = () => {
    return (
        <div class={style.home}>
            <p>
                Steam Room lets you compare your Steam library with your friends
                to help organise multiplayer sessions using games you already
                own.
            </p>
        </div>
    );
};

export default Home;
