import "./App.css";
import { Link } from "react-router-dom";

function App() {
    return (
        <div className="App flex h-screen items-center justify-center">
            <main className="flex flex-col items-center">
                <h1>multi-step registration form</h1>
                <div className="mb-10">로그인 화면 작성예정</div>

                <button>
                    <Link className="border rounded" to={"register"}>시험 등록</Link>
                </button>
                <div className="m-3" />
                <button>
                    <Link className="border rounded" to={"table"}>예시 테이블</Link>
                </button>
            </main>
        </div>
    );
}

export default App;

{
    /* <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
            <h1 className="text-3xl font-bold underline">My shamelessly pirated hooks</h1> */
}
