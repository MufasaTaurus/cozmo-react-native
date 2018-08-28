import React, { PropTypes } from 'react';
import ChartCard from './ChartCard';
import TextCard from './TextCard';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Sector, Cell } from 'recharts';
import './charts.less';


export class Charts extends React.Component {

    constructor(props) {
        super(props);
        const pieChartWidth = 500;
        const pieChartHeight = 240;
        this.state = {
            colors: ['#EE9939', '#E34D47', '#3E99D6', '#35AB64', '#EFC141'],
            radian: Math.PI / 180,
            config: {
                barChart: {
                    width: 500,
                    height: 240,
                    barCategoryGap: 10,
                    margin: { top: 20 }
                },
                bar: {
                    fill: '#51CBBB'
                },
                xAxis: {
                    axisLine: false,
                    tickSize: 14,
                    tickLine: { stroke: 'transparent' },
                    tick: { fontSize: 12 },
                    height: 30
                },
                label: {
                    fill: '#737373',
                    fontSize: 12,
                    formatter: (v) => '$' + v,
                    position: 'top',
                    offset: 10
                },
                pieChart: {
                    width: pieChartWidth,
                    height: pieChartHeight,
                },
                pie: {
                    cx: pieChartWidth / 2,
                    cy: pieChartHeight / 2,
                    innerRadius: 60,
                    outerRadius: 90,
                    fill: '#51CBBB'
                }
            },
            pieChartData: [
                {name: 'Cleaning', value: 4000},
                {name: 'Supplies', value: 3000},
                {name: 'Other', value: 2000},
                {name: 'Emergencies', value: 2000},
                {name: 'Reservation', value: 2600},
            ],
            barChartData: [
                {name: 'Jan', revenue: 1234},
                {name: 'Feb', revenue: 1681},
                {name: 'Mar', revenue: 1086},
                {name: 'Apr', revenue: 1111},
                {name: 'May', revenue: 1521},
                {name: 'Jun', revenue: 752},
                {name: 'Jul', revenue: 1139},
                {name: 'Aug', revenue: 1752},
                {name: 'Sep', revenue: 1781},
                {name: 'Oct', revenue: 1985},
                {name: 'Nov', revenue: 1296},
                {name: 'Dec', revenue: 610},
            ],
            stackedBarChartData: [
                {name: 'Jan', revenue: 1134, spending: 100},
                {name: 'Feb', revenue: 1481, spending: 100},
                {name: 'Mar', revenue: 586, spending: 800},
                {name: 'Apr', revenue: 1011, spending: 100},
                {name: 'May', revenue: 1121, spending: 100},
                {name: 'Jun', revenue: 452, spending: 100},
                {name: 'Jul', revenue: 1039, spending: 100},
                {name: 'Aug', revenue: 252, spending: 500},
                {name: 'Sep', revenue: 1181, spending: 200},
                {name: 'Oct', revenue: 1785, spending: 100},
                {name: 'Nov', revenue: 296, spending: 1000},
                {name: 'Dec', revenue: 610, spending: 100},
            ]
        };
    }

    getColor(index) {
        return this.state.colors[index % this.state.colors.length];
    }

    renderCustomizedLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) {
        const radius = outerRadius + 20;
        const x  = cx + radius * Math.cos(-midAngle * this.state.radian);
        const y = cy  + radius * Math.sin(-midAngle * this.state.radian);
        const lineLength = 50;
        const x2 = x > cx ? x + lineLength : x - lineLength;
        const color = this.getColor(index);
        const labelPaddingY = y - 10;
        const xPadding = 10;
        const labelPaddingX = x > cx ? x + xPadding : x - xPadding;

        return (
            <g key={ index }>
                <line
                    height="1"
                    width={ lineLength }
                    x={ x }
                    y={ y }
                    stroke={ color }
                    fill="none"
                    x1={ x }
                    y1={ y }
                    x2={ x2 }
                    y2={ y }/>
                <text
                    x={ labelPaddingX }
                    y={ labelPaddingY }
                    fill="#7d7d7d"
                    fontSize={ 12 }
                    textAnchor={ x > cx ? 'start' : 'end' }
                    dominantBaseline="central">
                    { this.state.pieChartData[index].name }
                </text>
            </g>
        );
    }

    render() {
        return (
            <div className="charts">
                <ChartCard title="Revenue: Month by Month" subtitle="2017">
                    <BarChart data={ this.state.barChartData } { ...this.state.config.barChart }>
                        <XAxis dataKey="name" { ...this.state.config.xAxis }/>
                        <Bar dataKey="revenue" { ...this.state.config.bar } label={ this.state.config.label }/>
                    </BarChart>
                </ChartCard>

                <ChartCard title="Expenses: Month by Month" subtitle="2017">
                    <BarChart data={ this.state.barChartData } { ...this.state.config.barChart }>
                        <XAxis dataKey="name" { ...this.state.config.xAxis }/>
                        <Bar dataKey="revenue" { ...this.state.config.bar } label={ this.state.config.label }/>
                    </BarChart>
                </ChartCard>

                <ChartCard title="Revenue vs Spending: Month by Month" subtitle="2017">
                    <BarChart data={ this.state.stackedBarChartData } { ...this.state.config.barChart }>
                        <XAxis dataKey="name" { ...this.state.config.xAxis }/>
                        <Bar dataKey="revenue" { ...this.state.config.bar } stackId="a" />
                        <Bar
                            dataKey="spending"
                            fill="#F04741"
                            stackId="a"
                            label={ this.state.config.label }
                        />
                    </BarChart>
                </ChartCard>

                <ChartCard title="Occupancy Rate: Month by Month" subtitle="2017">
                    <BarChart data={ this.state.barChartData } { ...this.state.config.barChart }>
                        <XAxis dataKey="name" { ...this.state.config.xAxis }/>
                        <Bar dataKey="revenue" { ...this.state.config.bar } label={ this.state.config.label }/>
                    </BarChart>
                </ChartCard>

                <ChartCard title="Spending Breakdown" subtitle="2017">
                    <PieChart { ...this.state.config.pieChart }>
                        <Pie
                            data={ this.state.pieChartData }
                            dataKey={ 'value' }
                            nameKey={ 'name' }
                            isAnimationActive={ false }
                            label={ (data) => this.renderCustomizedLabel(data) }
                            { ...this.state.config.pie }>
                            {
                                this.state.pieChartData.map((entry, index) => {
                                    const color = this.getColor(index);
                                    return <Cell key={ index } fill={ color }/>;
                                })
                            }
                        </Pie>
                    </PieChart>
                </ChartCard>

                <ChartCard title="Reviews" subtitle="July 2017">
                    <TextCard
                        style={{ width: this.state.config.barChart.width, height: this.state.config.barChart.height }}
                        icon="verySad"
                        title="19%"
                        subtitle="Say they were satisfied with their stay"/>
                </ChartCard>
            </div>
        );
    }
}


// Charts.PropTypes = {
//     icon: React.PropTypes.string,
//     title: React.PropTypes.string,
//     editable: React.PropTypes.bool,
//     onEdit: React.PropTypes.func,
// };

export default Charts;
