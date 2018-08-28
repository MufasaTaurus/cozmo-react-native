import React from 'react';
import moment from 'moment';
import TitleHeader from 'components/TitleHeader';
import Table from 'components/Table';
import CleanerName from 'components/CleanerName';
import SearchBar from 'components/SearchBar';
import StatusLabel from 'components/StatusLabel';
import ButtonNew from 'components/ButtonNew';
import Spinner from 'components/Spinner';
import CreateJob from 'components/Vendors/Dashboard/CreateJob';
import SVG from 'components/SVG';
import MoreMenu from 'components/MoreMenu';
import Image from './Image';
import './jobs.less';

export class Jobs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            createOpen: false
        };
        this.tableHeader = [
            { name: 'Cleaning Day' },
            { name: 'Cleaner' },
            { name: 'Payment' },
            { name: 'Work Progress' },
            { name: 'Date Updated' },
            { name: '', type: 'menu' },
        ];
    }

    getJobs() {
        return this.props.jobs
            .map((job) => {
                const id = job.getId();
                const jobDay =
                    <div className="icon-wrapper">
                        <div className="icon"><SVG icon="cogwheel" size={ 18 }/></div>
                        <div className="cleaning-day">
                            <div className="month">{ job.getDate() }</div>
                            <div className="day">{ job.getTimeFrame() }</div>
                        </div>
                    </div>;
                const update =
                    <div className="date-updated">
                        <div className="day">July 25, 2017</div>
                        <div className="time">9:54AM</div>
                    </div>;
                const menu = <MoreMenu buttons={ [
                    { label: 'Edit', click: () => {} },
                    { label: 'Details', click: () => {} },
                    { label: 'Archive', click: () => {} }
                ] }/>;
                return {
                    className: 'property',
                    key: id,
                    //onClick: () => this.props.selectProperty(id),
                    values: [
                        jobDay,
                        <CleanerName fullName={ 'Claudia' }/>,
                        job.getCost(),
                        <StatusLabel label={ job.getStatus() }/>,
                        update,
                        menu
                    ]
                };
            }).toArray();
    }

    render() {
        return (
            <div className="vendors-properties-details-jobs">
                <div className="add-job">
                    <Image/>
                    <div className="title">Crate a Job!</div>
                    <div className="info">You can manually create a job</div>
                    <ButtonNew label="Create" className="green" onClick={ () => this.setState({ createOpen: true }) }/>
                </div>
                <div className="jobs-list">
                    <div className="vj-card">
                        <TitleHeader title="Jobs" icon="paint"/>
                        <SearchBar borderBottom={ false } borderTop={ false }/>
                        <Table head={ this.tableHeader } body={ this.getJobs() }/>
                        { this.props.loading && <div className="vj-spinner-wrapper"><Spinner/></div> }
                    </div>
                </div>
                <CreateJob
                    onClose={ () => this.setState({ createOpen: false }) }
                    date={ moment() }
                    onSubmit={ this.props.createJob }
                    property={ this.props.id }
                    open={ this.state.createOpen }/>
            </div>
        );
    }
}

export default Jobs;
