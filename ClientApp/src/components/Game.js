import React, { Component } from 'react';
import axios from 'axios';
import error0 from "../assets/error0.png";
import error1 from "../assets/error1.png";
import error2 from "../assets/error2.png";
import error3 from "../assets/error3.png";
import error4 from "../assets/error4.png";
import error5 from "../assets/error5.png";
import error6 from "../assets/error6.png";

export class Game extends Component {
    static displayName = Game.name;

    constructor(props) {
        super(props);
        this.state = {
            GameStart: false,
            GameID: null,
            Word: null,
            Error: 0,
            ImgsError: [error0, error1, error2, error3, error4, error5, error6],
            Win: false,
            Letters: {
                "A": 1,
                "Б": 1,
                "В": 1,
                "Г": 1,
                "Д": 1,
                "Е": 1,
                "Ж": 1,
                "З": 1,
                "И": 1,
                "Й": 1,
                "К": 1,
                "Л": 1,
                "М": 1,
                "Н": 1,
                "О": 1,
                "П": 1,
                "Р": 1,
                "С": 1,
                "Т": 1,
                "У": 1,
                "Ф": 1,
                "Х": 1,
                "Ц": 1,
                "Ч": 1,
                "Ш": 1,
                "Щ": 1,
                "Ъ": 1,
                "Ы": 1,
                "Ь": 1,
                "Э": 1,
                "Ю": 1,
                "Я": 1,
            }
        };
    }

    render() {
        if (!this.state.GameStart) {
            return this.render_StartMenu();
        } else {
            return this.render_Game();
        }
    }

    render_Game() {
        return (
            <div>
                <section className="jumbotron text-center">
                    <div className="container">
                        <h2>Игра началась!</h2>
                        <div>
                            <img src={this.state.ImgsError[this.state.Error]} />
                        </div>

                        <div className="row" style={{ width: "50%", margin: "auto" }}>
                            {this.state.Word.map((letter) => (
                                <div className="text-center" style={{ border: "solid", fontSize: "20pt", width: "25pt", margin: "auto" }}>
                                    {letter}
                                </div>
                            ))}
                        </div>
                        <br />
                        {this.render_botton()}
                    </div>
                </section>
            </div>);
    }

    render_botton() {
        if (this.state.Error < 6 && !this.state.Win) {
            return (
                <div className="row" style={{ width: "30%", margin: "auto" }}>
                    {Object.keys(this.state.Letters).map((key) => this.render_LetterButton(key))}
                </div>
            );
        } else if (this.state.Error == 6) {
            return (
                <span style={{ color: "red" }}>Вы проиграли :(</span>
            );
        } else {
            return (
                <span style={{ color: "green" }}>Ура! А кто у нас тут умница? :)</span>
            );
        }
    }

    render_LetterButton(key) {
        if (this.state.Letters[key] == 1) {
            return (
                <input type="button" value={key} className="btn btn-success" style={{ width: "25pt", margin: "auto" }} onClick={() => this.CheckLetter(key)} />
            );
        } else {
            return (
                <input type="button" value={key} className="btn btn-secondary" disabled style={{ width: "25pt", margin: "auto" }} />
            );
        }
    }

    render_StartMenu() {
        return (
            <div>
                <h1>Добро пожаловать в игру "Виселица"</h1>
                <input type="button" className="btn btn-success" value="Начать" onClick={() => this.StartGame()} />
            </div>
        );
    }

    async StartGame() {
        await axios.get('api/game/start')
            .then(response => this.setState({ GameStart: true, GameID: response.data['gameID'], Word: response.data['word'] }))
            .catch(error => console.log(error));
    }

    async CheckLetter(key) {
        this.state.Letters[key] = 0;
        this.setState({ Letters: this.state.Letters })
        await axios.post('api/game/checkletter', { GameID: this.state.GameID, Word: this.state.Word, Letter: key })
            .then(response => {
                if (response.data['good']) {
                    this.setState({ Word: response.data['word'] })
                    let win = true;
                    for (let i = 0; i < this.state.Word.length; i++) {
                        if (this.state.Word[i] == "*")
                            win = false;
                    }
                    this.setState({ Win: win })
                } else {
                    this.setState({ Error: this.state.Error + 1 })
                }
            })
        /*await axios.get('api/game/CheckLetter')
            .then(response => this.setState({ GameStart: true, GameID: response.data['gameID'], Word: response.data['word'] }))
            .catch(error => console.log(error));*/
    }
}
