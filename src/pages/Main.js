import React, { useEffect, useState } from 'react';

import api from '../services/api';

export default function Main({ match }) {
	const [user, setUser] = useState([]);
	const [subjects, setSubjects] = useState([]);

	const [activitiesState, setActivitiesState] = useState([]);

	useEffect(() => {
		async function loadUser() {
      const response = await api.get('/student', {
        headers: {
          student: match.params.id
        }
      });

			setUser(response.data);
		};

		loadUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

  useEffect(() => {
    async function loadSubjects() {
      const response = await api.get('/all', {
        headers: {
          student: match.params.id
        }
			});
			
			//response.data.sort((a, b) => a.name.localeCompare(b.name));

			setSubjects(response.data);
		};

    loadSubjects();
	}, [match.params.id, activitiesState]);

	async function handleActivity(id, type, value) {
		value = value ? false : true;

		await api.post('/activity/update', null, {
			headers: {
				activity_id: id,
				activity_type: type,
				activity_value: value
			}
		});

		setActivitiesState(activitiesState + 1);
	};

  return(
    <>
      <section className="hero is-small is-light is-pattern-notebook">
        <div className="hero-head">
          <nav className="navbar">
            <div className="container">
              <div className="nav-brand">
                <a href={`/student/${match.params.id}`} className="navbar-item title is-4 m-t-md">
                  Minhas Atividades
                </a>
                <span className="navbar-burguer burger" data-targer="navbarMenu">
                  <span></span>
                  <span></span>
                </span>
              </div>
              <div id="navbarMenu" className="navbar-menu">
                <div className="navbar-end">
                  <a href={`/student/${match.params.id}/manage`} className="navbar-item is-hidden">
									<span className="icon">
                      <i className="fa fa-book-dead"></i>
                    </span>
                    <span>Gerenciar Atividades</span> 
                  </a>
                  <a href="/" className="navbar-item">
                    <span className="icon">
                      <i className="fa fa-sign-out-alt"></i>
                    </span>
                    <span>Sair</span>                  
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="hero-body m-b-md">
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column is-2">
              <figure className="image is-128x128">
                <img className="is-rounded" src={user.avatar} alt={user.name} />
              </figure>
              </div>
              <div className="column is-10">
                <h1 className="title">
                  Olá, {user.name}
                </h1>
                <h2 className="subtitle has-text-link is-hidden">
                  Você concluiu 0 de 0 Exercícios 
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
			
      <section className="container p-t-lg p-b-xl p-l-sm p-r-sm">
				{subjects.map(subject => (
					<React.Fragment key={subject._id}>
						<h1 className="title">{subject.name}</h1>
						
						<div className="block is-transition">
							<div className="columns is-multiline">
								{subject.activities.map(activity => (
									<div className="column is-3" key={activity._id}>
										<h2 className={"title is-4 is-marginless " + (activity.es && activity.ec ? 'is-completed' : '')}>{activity.theme}</h2>

										<label className={"checkbox p-r-md " + (activity.es ? 'is-completed' : '')}>
											<input type="checkbox" className="m-l-xs m-r-xs" onClick={() => handleActivity(activity._id, 'es', activity.es)} defaultChecked={activity.es} />															
											Sala
										</label>
										<label className={"checkbox p-r-md " + (activity.ec ? 'is-completed' : '')}>
											<input type="checkbox" className="m-l-xs m-r-xs" onClick={() => handleActivity(activity._id, 'ec', activity.ec)} defaultChecked={activity.ec} />
											Complementar
										</label>
									</div>
								))}
							</div>
							<hr />
						</div>
					</React.Fragment>
				))}
      </section>
    </>
  );
}