import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import api from '../../services/api';

import Container from '../../Components/Container';
import { Loading, Owner, IssueList, Pagination } from './styles';

export default class Repository extends Component {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    repository: {},
    issues: [],
    issuesCount: 0,
    loading: true,
    status: 'all',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { status } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issuesCount, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: `${status}`,
        },
      }),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: `${status}`,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      issuesCount: Math.ceil(issuesCount.data.length / 5),
      loading: false,
    });

    document.getElementsByClassName(status)[0].setAttribute('id', 'selected');
  }

  handleStatusFilter = async (e) => {
    const { status } = this.state;
    // remove the selected attribute from the clicked filter button
    document.getElementsByClassName(status)[0].removeAttribute('id');

    await this.setState({ status: e.target.value });

    this.handleReloadIssues();
  };

  handleReloadIssues = async () => {
    const { match } = this.props;
    const { status, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [issuesCount, response] = await Promise.all([
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: `${status}`,
        },
      }),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: `${status}`,
          per_page: 5,
          page,
          issues: 0,
        },
      }),
    ]);

    await this.setState({
      issues: response.data,
      issuesCount: Math.ceil(issuesCount.data.length / 5),
    });

    document.getElementsByClassName(status)[0].setAttribute('id', 'selected');
  };

  handlePagination = async (op) => {
    const { page } = this.state;

    await this.setState({ page: op === 'next' ? page + 1 : page - 1 });

    await this.handleReloadIssues();
  };

  render() {
    const { repository, issues, loading, issuesCount, page } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          <div className="filter">
            <button
              onClick={this.handleStatusFilter}
              className="all"
              type="button"
              value="all"
            >
              Todos
            </button>
            <button
              onClick={this.handleStatusFilter}
              className="open"
              type="button"
              value="open"
            >
              Abertos
            </button>
            <button
              onClick={this.handleStatusFilter}
              className="closed"
              type="button"
              value="closed"
            >
              Fechados
            </button>
          </div>
          {issues.map((issue) => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map((label) => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <Pagination>
          <button
            onClick={() => this.handlePagination('previous')}
            className="previous"
            type="button"
            disabled={page < 2 ? 1 : 0}
          >
            <FaAngleLeft />
          </button>
          <span>
            Página {page}/{issuesCount}
          </span>
          <button
            onClick={() => this.handlePagination('next')}
            className="next"
            type="button"
            disabled={
              page === issuesCount && (page !== 1 || page === 1) ? 1 : 0
            }
          >
            <FaAngleRight />
          </button>
        </Pagination>
      </Container>
    );
  }
}
