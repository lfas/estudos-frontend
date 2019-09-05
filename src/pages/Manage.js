import React, {useState, useEffect} from 'react';

import api from '../services/api';

export default function Manage({ match }) {
	const [subjects, setSubjects] = useState([]);
	// const [books, setBooks] = useState([]);

	const [subject, setSubject ] = useState('');

	const [subjectState, setSubjectState] = useState([]);

	useEffect(() => {
    async function loadSubjects() {
      const response = await api.get('/all', {
        headers: {
          student: match.params.id
        }
			});

			response.data.sort((a, b) => a.name.localeCompare(b.name));

			setSubjects(response.data);
		};
		
		loadSubjects();
	}, [match.params.id, subjectState]);


	async function handleSubjectNew(e) {
    e.preventDefault();

    await api.post(`/students/${match.params.id}/subject`, null, {
      headers: {
				name: subject
			}
		});
		
		setSubject('');
		setSubjectState(subjectState + 1);
	}
	
	// async function filterBooks() {
	// 	setBooks(subjects.books.filter(book => subject._id === '5d581d6e38c54f315039a47f' ));
	// }

	return(
		<>
			<section className="hero is-small is-light is-pattern-notebook">
        <div className="hero-head">
          <nav className="navbar">
            <div className="container">
              <div className="nav-brand">
                <a href={`/student/${match.params.id}`} className="navbar-item title is-4 m-t-md m-b-md">
                  Minhas Atividades
                </a>
              </div>
              <div id="navbarMenu" className="navbar-menu">
                <div className="navbar-end">
                  <a href={`/student/${match.params.id}/manage`} className="navbar-item">
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
      </section>

			<section className="container p-t-xl">
				<div className="block p-sm">
					<div className="columns">
						<div className="column is-2">
							<h1 className="title">Matérias</h1>
						</div>
						<div className="column is-6">
							<form onSubmit={handleSubjectNew}>
							<div className="field has-addons">
								<div className="control">
									<input
                    type="text"
                    placeholder="Nome da matéria..."
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="input"
                    required
                  />
								</div>
								<div className="control">
									<button type="submit" className="button is-link">
                    Salvar
                	</button>
								</div>
							</div>
							</form>
						</div>
					</div>

					<table className="table is-striped is-fullwidth">
						<thead>
							<tr>
								<th>Matérias</th>
								<th className="has-text-right"><span className="m-r-md">Ações</span></th>
							</tr>
						</thead>
						<tbody>
							{subjects.map(subject => (
								<tr key={subject._id}>							
									<td>{subject.name}</td>
									<td className="has-text-right">
										<a href="/" className="m-r-md">
											<span className="icon"><i className="fas fa-pencil-alt"></i></span>
											Editar
										</a>
										<a href="/" className="m-r-md">
											<span className="icon"><i className="fas fa-window-close"></i></span>
											Excluir
										</a>
									</td>							
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
			
			{/* <section className="container p-t-xl p-b-xxl">
				<div className="block p-sm">
					<div className="columns">
						<div className="column is-3">
							<h1 className="title">Atividades</h1>
						</div>
					</div>

					<div className="tabs">
						<ul>
							
							<li>
								<a>
									<span>Apostila 1</span>
								</a>
							</li>

							<li>
								<a>
									<span>Nova Apostila</span>
									<span className="icon is-small"><i className="fas fa-plus-circle" aria-hidden="true"></i></span>
								</a>
							</li>
						</ul>
					</div>		
				</div>
			</section> */}
		</>
	);
	
}