import React, { useState } from 'react';

import api from '../services/api';

export default function Login({ history }) {
  const [ username, setUsername ] = useState('');
  
  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/students', {
      username,
    });

    const { _id  } = response.data;

    history.push(`/student/${_id}`);
  }

  return (
    <section className="hero is-light is-pattern-notebook is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-5-desktop is-3-widescreen">
              <h1 className="title is-3 has-text-centered">Minhas Atividades</h1>
              <form className="box" onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="" className="label">Usuário</label>
                  <div className="control has-icons-right">
                    <input
                      type="text"
                      placeholder="Informe seu usuário..."
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      className="input"
                      required
                    />
                    <span className="icon is-small is-right">
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <button type="submit" className="button is-fullwidth is-link">
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}