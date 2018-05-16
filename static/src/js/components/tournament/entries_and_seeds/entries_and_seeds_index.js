import React from "react";
import {inject, observer} from "mobx-react";
import {Tabs, Tab} from "material-ui/Tabs";
import SwipeableViews from "react-swipeable-views";
import Spinner from "../../spinner/spinner";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui/Table";

const mobx = require("mobx");

const EntriesTableStyleIndex = {
    paddingLeft: "72px"
};
const EntriesTableStylePlayer = {
    paddingLeft: "38px"
};
const entriesTableStyleRank = {
    paddingLeft: "60px"
};
const entriesTableStyleSeed = {
    paddingLeft: "50px"
};
const entriesTableStyle = {
    backgroundColor: "white"
};

const entrieDoc = [];
const categoriesEntries = {};
const sorted = [];
@inject("stores")
@observer
export default class EntriesAndSeeds extends React.Component {
    constructor(props) {
        super(props);
        this.onCategoriesLoaded = this.onCategoriesLoaded.bind(this);

        this.state = {
            sortedEntries: null,
            slideIndex: 0,
            tournament: null,
            entries: null,
            categories: null,
            categoriesEntries :null
        };
    }

    handleChange = value => {
        this.setState({
            slideIndex: value
        });
    };

    componentWillMount() {
        console.log("componentwillMount:: loading...");
        this.setState({slideIndex: 0});
        const {TournamentStore} = this.props.stores;

        // Bring current tournament
        const tournament = mobx.toJS(TournamentStore.tournament)
            ? mobx.toJS(TournamentStore.tournament)
            : " ";
        this.setState({tournament: tournament});

        console.log("tournament", tournament);
        const self = this;
        // Bring categories by the tournament id
        TournamentStore.getCategories().then(categoriesRaw => {
            let categories = mobx.toJS(categoriesRaw);
            console.log("categories", categories);
            self.setState({categories: categories,slideIndex:categories[0].id },()=>{self.onCategoriesLoaded(categories)});
        });

    }

    onCategoriesLoaded(categories) {
        console.log('82');
        const {EntriesStore} = this.props.stores;
        let slide=0;
        const self=this;
        let categoriesEntries=[];
        categories.forEach(category=> {

            EntriesStore.fetchEntriesByCategory(category.id).then( entries=> {
                if(self.state.categoriesEntries) {
                    categoriesEntries = self.state.categoriesEntries;
                }
                categoriesEntries.push({"id":category.id, "value": mobx.toJS(entries)});
                self.setState({categoriesEntries: categoriesEntries});

            });
        });


    }

    render() {

        const createTab = (entry, index) => {
            {
                console.log('in createTab. slide index is:', this.state.slideIndex);
                console.log('in createTab. categoriesEntries are:', this.state.categoriesEntries);
                console.log('in createTab. entry is:', entry);
<<<<<<< origin/master

=======
                
>>>>>>> HEAD~0
            }
           return (
                <Tab
                    label={entry ? entry.value[0].tournament_category : "loading"}
                    value={entry.id}
                >
                    <div>
                        {entriesTable(entry.value)}
                    </div>
                </Tab>

            )
        };
        const entriesTable = (entries) => {
            {
                console.log('in entriesTable. slide index is:', this.state.slideIndex);
                console.log('in entriesTable. categoriesEntries are:', this.state.categoriesEntries);
                console.log('in entriesTable. entries are :', entries);

            }
            return (
                <div>
                    <Table style={entriesTableStyle}>
                        <TableHeader displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>#</TableHeaderColumn>
                                <TableHeaderColumn>Player</TableHeaderColumn>
                                <TableHeaderColumn>Rank</TableHeaderColumn>
                                <TableHeaderColumn>Seed</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>

                            {
                                entries.map((player, index) => createRow(player, index))
                            }

                        </TableBody>
                    </Table>
                </div>
            )
        };

        const createRow = (item, index) => {
            {
                console.log('in createRow. slide index is:', this.state.slideIndex);
                console.log('in createRow. categoriesEntries are:', this.state.categoriesEntries);
                console.log('in createRow. item is :', item);
                console.log('in createRow. index is :', index);
            }
            return (
                <TableRow key={index}>
                    <TableRowColumn style={EntriesTableStyleIndex}>
                        {index + 1}
                    </TableRowColumn>
                    <TableRowColumn style={EntriesTableStylePlayer}>
                        {item.player}
                    </TableRowColumn>
                    <TableRowColumn style={entriesTableStyleRank}>
                        {item.rank}
                    </TableRowColumn>
                    {item.is_seeded ? (
                        <TableRowColumn style={entriesTableStyleSeed}>Seeded</TableRowColumn>
                    ) : (
                        <TableRowColumn style={entriesTableStyleSeed}/>
                    )}
                </TableRow>)
        };


console.log('rendering');
    return (

            <div>
                <Tabs onChange={this.handleChange} value={this.state.slideIndex ? this.state.slideIndex :''}>
                    {this.state.categoriesEntries && this.state.slideIndex
                        ? this.state.categoriesEntries.map((entryByCat, index) =>{
                              createTab(entryByCat, index)
                        }):<div>{Spinner(70)}</div>
                    }

                </Tabs>

            </div>
        );
    }
}
