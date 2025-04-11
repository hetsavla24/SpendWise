
from dash import dcc, html
import dash_bootstrap_components as dbc
from category_tab import serve_category_tab  # Import the category tab layout

def serve_layout(df):
    # Create a styled container for the date picker
    date_picker = dcc.DatePickerRange(
        id='date-picker-range',
        start_date=df['Transaction_Date'].min().date() if df is not None else None,
        end_date=df['Transaction_Date'].max().date() if df is not None else None,
        display_format='YYYY-MM-DD',
        style={'fontSize': '16px'}
    )
    date_picker_container = html.Div(
        date_picker,
        style={
            'backgroundColor': '#f0f8ff',  # AliceBlue
            'padding': '20px',
            'margin': '20px auto',
            'width': '80%',
            'borderRadius': '10px',
            'boxShadow': '2px 2px 5px rgba(0, 0, 0, 0.1)',
            'textAlign': 'center'
        }
    )
    
    # Common summary boxes container with styling
    summary_container = html.Div(
        id='summary-boxes',
        style={
            'display': 'flex',
            'justifyContent': 'space-around',
            'padding': '20px',
            'backgroundColor': '#ffffff',
            'borderRadius': '10px',
            'boxShadow': '2px 2px 5px rgba(0, 0, 0, 0.1)',
            'margin': '20px auto',
            'width': '80%'
        }
    )
    
    # --- General Analysis Tab ---
    general_tab = html.Div([
        html.H2("General Transaction Analysis", style={'textAlign': 'center', 'color': '#333'}),
        html.Div([
            html.Div([
                dcc.Graph(
                    id='freq-bar',
                    config={'displayModeBar': True},
                    style={'height': '300px'}
                ),
                html.Button(
                    "Expand",
                    id="btn-expand-freq",
                    n_clicks=0,
                    style={
                        'position': 'absolute',
                        'bottom': '10px',
                        'right': '10px',
                        'backgroundColor': '#007BFF',
                        'color': '#fff',
                        'border': 'none',
                        'borderRadius': '5px'
                    }
                )
            ], className="graph-card", style={
                'width': '45%',
                'display': 'inline-block',
                'position': 'relative',
                'margin': '10px',
                'backgroundColor': '#f9f9f9',
                'borderRadius': '10px',
                'boxShadow': '1px 1px 3px rgba(0,0,0,0.1)'
            }),
            html.Div([
                dcc.Graph(
                    id='top-transactions',
                    config={'displayModeBar': True},
                    style={'height': '300px'}
                ),
                html.Button(
                    "Expand",
                    id="btn-expand-top",
                    n_clicks=0,
                    style={
                        'position': 'absolute',
                        'bottom': '10px',
                        'right': '10px',
                        'backgroundColor': '#28A745',
                        'color': '#fff',
                        'border': 'none',
                        'borderRadius': '5px'
                    }
                )
            ], className="graph-card", style={
                'width': '45%',
                'display': 'inline-block',
                'position': 'relative',
                'margin': '10px',
                'backgroundColor': '#f9f9f9',
                'borderRadius': '10px',
                'boxShadow': '1px 1px 3px rgba(0,0,0,0.1)'
            })
        ], style={'textAlign': 'center'}),
        html.Div([
            html.Div([
                dcc.Graph(
                    id='amount-pie',
                    config={'displayModeBar': True},
                    style={'height': '300px'}
                ),
                html.Button(
                    "Expand",
                    id="btn-expand-amount",
                    n_clicks=0,
                    style={
                        'position': 'absolute',
                        'bottom': '10px',
                        'right': '10px',
                        'backgroundColor': '#17A2B8',
                        'color': '#fff',
                        'border': 'none',
                        'borderRadius': '5px'
                    }
                )
            ], className="graph-card", style={
                'width': '45%',
                'display': 'inline-block',
                'position': 'relative',
                'margin': '10px',
                'backgroundColor': '#f9f9f9',
                'borderRadius': '10px',
                'boxShadow': '1px 1px 3px rgba(0,0,0,0.1)'
            }),
            html.Div([
                dcc.Graph(
                    id='date-trend',
                    config={'displayModeBar': True},
                    style={'height': '300px'}
                ),
                html.Button(
                    "Expand",
                    id="btn-expand-trend",
                    n_clicks=0,
                    style={
                        'position': 'absolute',
                        'bottom': '10px',
                        'right': '10px',
                        'backgroundColor': '#FFC107',
                        'color': '#fff',
                        'border': 'none',
                        'borderRadius': '5px'
                    }
                )
            ], className="graph-card", style={
                'width': '45%',
                'display': 'inline-block',
                'position': 'relative',
                'margin': '10px',
                'backgroundColor': '#f9f9f9',
                'borderRadius': '10px',
                'boxShadow': '1px 1px 3px rgba(0,0,0,0.1)'
            })
        ], style={'textAlign': 'center'}),
        # Hidden Stores for full-size figures (for modals)
        dcc.Store(id='store-freq-bar'),
        dcc.Store(id='store-top-transactions'),
        dcc.Store(id='store-amount-pie'),
        dcc.Store(id='store-date-trend'),
        # Modals for expanded views
        dbc.Modal([
            dbc.ModalHeader("Frequency Distribution"),
            dbc.ModalBody(dcc.Graph(id='modal-freq-bar', style={'height': '600px'})),
            dbc.ModalFooter(dbc.Button("Close", id="close-modal-freq", className="ml-auto"))
        ], id="modal-freq", size="xl", is_open=False),
        dbc.Modal([
            dbc.ModalHeader("Top Transactions"),
            dbc.ModalBody(dcc.Graph(id='modal-top-transactions', style={'height': '600px'})),
            dbc.ModalFooter(dbc.Button("Close", id="close-modal-top", className="ml-auto"))
        ], id="modal-top", size="xl", is_open=False),
        dbc.Modal([
            dbc.ModalHeader("Transaction Amount Distribution"),
            dbc.ModalBody(dcc.Graph(id='modal-amount-pie', style={'height': '600px'})),
            dbc.ModalFooter(dbc.Button("Close", id="close-modal-amount", className="ml-auto"))
        ], id="modal-amount", size="xl", is_open=False),
        dbc.Modal([
            dbc.ModalHeader("Transaction Trends Over Time"),
            dbc.ModalBody(dcc.Graph(id='modal-date-trend', style={'height': '600px'})),
            dbc.ModalFooter(dbc.Button("Close", id="close-modal-trend", className="ml-auto"))
        ], id="modal-trend", size="xl", is_open=False)
    ])
    
    # --- Breakdown Analysis Tab ---
    breakdown_tab = html.Div([
        html.H2("Transaction Breakdown Analysis", style={'textAlign': 'center', 'color': '#333'}),
        html.Div([
            html.Label("Select Year", style={'fontWeight': 'bold'}),
            dcc.Dropdown(
                id='year-dropdown',
                options=[{'label': str(y), 'value': y} for y in sorted(df['Year'].unique())] if df is not None else [],
                placeholder='Select Year',
                style={'width': '90%', 'margin': '0 auto'}
            )
        ], style={'width': '30%', 'display': 'inline-block', 'verticalAlign': 'top', 'margin': '10px'}),
        html.Div([
            html.Label("Select Month", style={'fontWeight': 'bold'}),
            dcc.Dropdown(
                id='month-dropdown',
                placeholder='Select Month',
                style={'width': '90%', 'margin': '0 auto'}
            )
        ], style={'width': '30%', 'display': 'inline-block', 'verticalAlign': 'top', 'margin': '10px'}),
        html.Div([
            html.Label("Select Week", style={'fontWeight': 'bold'}),
            dcc.Dropdown(
                id='week-dropdown',
                placeholder='Select Week',
                style={'width': '90%', 'margin': '0 auto'}
            )
        ], style={'width': '30%', 'display': 'inline-block', 'verticalAlign': 'top', 'margin': '10px'}),
        # Breakdown graphs arranged in two rows
        html.Div([
            html.Div([
                dcc.Graph(id='yearly-summary', config={'displayModeBar': True}, style={'height': '300px'}),
                html.Button("Expand", id="btn-expand-yearly", n_clicks=0,
                            style={
                                'position': 'absolute', 'bottom': '10px', 'right': '10px',
                                'backgroundColor': '#6f42c1',
                                'color': '#fff',
                                'border': 'none',
                                'borderRadius': '5px'
                            }
                )
            ], className="graph-card", style={
                'width': '45%',
                'display': 'inline-block',
                'position': 'relative',
                'margin': '10px',
                'backgroundColor': '#f9f9f9',
                'borderRadius': '10px',
                'boxShadow': '1px 1px 3px rgba(0,0,0,0.1)'
            }),
            html.Div([
                dcc.Graph(id='monthly-summary', config={'displayModeBar': True}, style={'height': '300px'}),
                html.Button("Expand", id="btn-expand-monthly", n_clicks=0,
                            style={
                                'position': 'absolute', 'bottom': '10px', 'right': '10px',
                                'backgroundColor': '#e83e8c',
                                'color': '#fff',
                                'border': 'none',
                                'borderRadius': '5px'
                            }
                )
            ], className="graph-card", style={
                'width': '45%',
                'display': 'inline-block',
                'position': 'relative',
                'margin': '10px',
                'backgroundColor': '#f9f9f9',
                'borderRadius': '10px',
                'boxShadow': '1px 1px 3px rgba(0,0,0,0.1)'
            })
        ], style={'textAlign': 'center'}),
        html.Div([
            html.Div([
                dcc.Graph(id='weekly-summary', config={'displayModeBar': True}, style={'height': '300px'}),
                html.Button("Expand", id="btn-expand-weekly", n_clicks=0,
                            style={
                                'position': 'absolute', 'bottom': '10px', 'right': '10px',
                                'backgroundColor': '#fd7e14',
                                'color': '#fff',
                                'border': 'none',
                                'borderRadius': '5px'
                            }
                )
            ], className="graph-card", style={
                'width': '45%',
                'display': 'inline-block',
                'position': 'relative',
                'margin': '10px',
                'backgroundColor': '#f9f9f9',
                'borderRadius': '10px',
                'boxShadow': '1px 1px 3px rgba(0,0,0,0.1)'
            }),
            html.Div([
                dcc.Graph(id='daily-summary', config={'displayModeBar': True}, style={'height': '300px'}),
                html.Button("Expand", id="btn-expand-daily", n_clicks=0,
                            style={
                                'position': 'absolute', 'bottom': '10px', 'right': '10px',
                                'backgroundColor': '#20c997',
                                'color': '#fff',
                                'border': 'none',
                                'borderRadius': '5px'
                            }
                )
            ], className="graph-card", style={
                'width': '45%',
                'display': 'inline-block',
                'position': 'relative',
                'margin': '10px',
                'backgroundColor': '#f9f9f9',
                'borderRadius': '10px',
                'boxShadow': '1px 1px 3px rgba(0,0,0,0.1)'
            })
        ], style={'textAlign': 'center'}),
        # Hidden Stores for breakdown figures
        dcc.Store(id='store-yearly-summary'),
        dcc.Store(id='store-monthly-summary'),
        dcc.Store(id='store-weekly-summary'),
        dcc.Store(id='store-daily-summary'),
        # Modals for breakdown analysis
        dbc.Modal([
            dbc.ModalHeader("Yearly Summary"),
            dbc.ModalBody(dcc.Graph(id='modal-yearly-summary', style={'height': '600px'})),
            dbc.ModalFooter(dbc.Button("Close", id="close-modal-yearly", className="ml-auto"))
        ], id="modal-yearly", size="xl", is_open=False),
        dbc.Modal([
            dbc.ModalHeader("Monthly Summary"),
            dbc.ModalBody(dcc.Graph(id='modal-monthly-summary', style={'height': '600px'})),
            dbc.ModalFooter(dbc.Button("Close", id="close-modal-monthly", className="ml-auto"))
        ], id="modal-monthly", size="xl", is_open=False),
        dbc.Modal([
            dbc.ModalHeader("Weekly Summary"),
            dbc.ModalBody(dcc.Graph(id='modal-weekly-summary', style={'height': '600px'})),
            dbc.ModalFooter(dbc.Button("Close", id="close-modal-weekly", className="ml-auto"))
        ], id="modal-weekly", size="xl", is_open=False),
        dbc.Modal([
            dbc.ModalHeader("Daily Summary"),
            dbc.ModalBody(dcc.Graph(id='modal-daily-summary', style={'height': '600px'})),
            dbc.ModalFooter(dbc.Button("Close", id="close-modal-daily", className="ml-auto"))
        ], id="modal-daily", size="xl", is_open=False)
    ])
    
    # Main layout with headers, date picker container, summary boxes, and tabs
    layout = html.Div([
        html.H1("SpendWise", style={
            'textAlign': 'center',
            'color': '#28A745',
            'fontSize': '40px',
            'fontWeight': 'bold'
        }),
        # html.H2("Transaction Analysis Dashboard", style={
        #     'textAlign': 'center',
        #     'color': '#28A745',
        #     'fontSize': '30px',
        #     'fontWeight': 'bold'
        # }),
        date_picker_container,
        summary_container,
        dcc.Tabs([
            dcc.Tab(
                label="General Analysis",
                children=[general_tab],
                style={'backgroundColor': '#F8F9FA', 'fontWeight': 'bold'}
            ),
            dcc.Tab(
                label="Y_M_W_D Breakdown",
                children=[breakdown_tab],
                style={'backgroundColor': '#F8F9FA', 'fontWeight': 'bold'}
            )
        ], style={'margin': '20px'})
    ], style={'backgroundColor': '#e9ecef', 'padding': '20px'})
    
    category_tab = serve_category_tab()

    layout = html.Div([
        html.H1("SpendWise", style={
            'textAlign': 'center',
            'color': '#007BFF',
            'fontSize': '40px',
            'fontWeight': 'bold'
        }),
        html.H2("Transaction Analysis Dashboard", style={
            'textAlign': 'center',
            'color': '#28A745',
            'fontSize': '30px',
            'fontWeight': 'bold'
        }),
        date_picker_container,
        summary_container,
        dcc.Tabs([
            dcc.Tab(label="General Analysis", children=[general_tab], style={'backgroundColor': '#F8F9FA', 'fontWeight': 'bold'}),
            dcc.Tab(label="Y_M_W_D Breakdown", children=[breakdown_tab], style={'backgroundColor': '#F8F9FA', 'fontWeight': 'bold'}),
            dcc.Tab(label="Category Specification", children=[category_tab], style={'backgroundColor': '#F8F9FA', 'fontWeight': 'bold'})
        ], style={'margin': '20px'})
    ], style={'backgroundColor': '#e9ecef', 'padding': '20px'})
    
    return layout


# from dash import dcc, html
# import dash_bootstrap_components as dbc

# def serve_layout(df):
#     # Common date picker (used for filtering in both tabs)
#     date_picker = dcc.DatePickerRange(
#         id='date-picker-range',
#         start_date=df['Transaction_Date'].min().date() if df is not None else None,
#         end_date=df['Transaction_Date'].max().date() if df is not None else None,
#         display_format='YYYY-MM-DD'
#     )


#     # Common summary boxes container (populated via callback)
#     summary_container = html.Div(id='summary-boxes', 
#                                  style={'display': 'flex', 'justifyContent': 'space-around', 'padding': '10px'})
    
#     # --- General Analysis Tab ---
#     general_tab = html.Div([
#         html.H2("General Transaction Analysis"),
#         html.Div([
#             html.Div([
#                 dcc.Graph(id='freq-bar', config={'displayModeBar': True}, style={'height': '300px'}),
#                 html.Button("Expand", id="btn-expand-freq", n_clicks=0,
#                             style={'position': 'absolute', 'bottom': '10px', 'right': '10px'})
#             ], className="graph-card", style={'width': '45%', 'display': 'inline-block', 
#                                                 'position': 'relative', 'margin': '10px'}),
#             html.Div([
#                 dcc.Graph(id='top-transactions', config={'displayModeBar': True}, style={'height': '300px'}),
#                 html.Button("Expand", id="btn-expand-top", n_clicks=0,
#                             style={'position': 'absolute', 'bottom': '10px', 'right': '10px'})
#             ], className="graph-card", style={'width': '45%', 'display': 'inline-block', 
#                                                 'position': 'relative', 'margin': '10px'})
#         ], style={'textAlign': 'center'}),
#         html.Div([
#             html.Div([
#                 dcc.Graph(id='amount-pie', config={'displayModeBar': True}, style={'height': '300px'}),
#                 html.Button("Expand", id="btn-expand-amount", n_clicks=0,
#                             style={'position': 'absolute', 'bottom': '10px', 'right': '10px'})
#             ], className="graph-card", style={'width': '45%', 'display': 'inline-block', 
#                                                 'position': 'relative', 'margin': '10px'}),
#             html.Div([
#                 dcc.Graph(id='date-trend', config={'displayModeBar': True}, style={'height': '300px'}),
#                 html.Button("Expand", id="btn-expand-trend", n_clicks=0,
#                             style={'position': 'absolute', 'bottom': '10px', 'right': '10px'})
#             ], className="graph-card", style={'width': '45%', 'display': 'inline-block', 
#                                                 'position': 'relative', 'margin': '10px'})
#         ], style={'textAlign': 'center'}),
#         # Hidden Stores for full-size figures (for modals)
#         dcc.Store(id='store-freq-bar'),
#         dcc.Store(id='store-top-transactions'),
#         dcc.Store(id='store-amount-pie'),
#         dcc.Store(id='store-date-trend'),
#         # Modals for expanded views
#         dbc.Modal([
#             dbc.ModalHeader("Frequency Distribution"),
#             dbc.ModalBody(dcc.Graph(id='modal-freq-bar', style={'height': '600px'})),
#             dbc.ModalFooter(dbc.Button("Close", id="close-modal-freq", className="ml-auto"))
#         ], id="modal-freq", size="xl", is_open=False),
#         dbc.Modal([
#             dbc.ModalHeader("Top Transactions"),
#             dbc.ModalBody(dcc.Graph(id='modal-top-transactions', style={'height': '600px'})),
#             dbc.ModalFooter(dbc.Button("Close", id="close-modal-top", className="ml-auto"))
#         ], id="modal-top", size="xl", is_open=False),
#         dbc.Modal([
#             dbc.ModalHeader("Transaction Amount Distribution"),
#             dbc.ModalBody(dcc.Graph(id='modal-amount-pie', style={'height': '600px'})),
#             dbc.ModalFooter(dbc.Button("Close", id="close-modal-amount", className="ml-auto"))
#         ], id="modal-amount", size="xl", is_open=False),
#         dbc.Modal([
#             dbc.ModalHeader("Transaction Trends Over Time"),
#             dbc.ModalBody(dcc.Graph(id='modal-date-trend', style={'height': '600px'})),
#             dbc.ModalFooter(dbc.Button("Close", id="close-modal-trend", className="ml-auto"))
#         ], id="modal-trend", size="xl", is_open=False)
#     ])
    
#     # --- Breakdown Analysis Tab ---
#     breakdown_tab = html.Div([
#         html.H2("Transaction Breakdown Analysis"),
#         html.Div([
#             html.Label("Select Year"),
#             dcc.Dropdown(
#                 id='year-dropdown',
#                 options=[{'label': str(y), 'value': y} for y in sorted(df['Year'].unique())] if df is not None else [],
#                 placeholder='Select Year'
#             )
#         ], style={'width': '30%', 'display': 'inline-block', 'verticalAlign': 'top', 'margin': '10px'}),
#         html.Div([
#             html.Label("Select Month"),
#             dcc.Dropdown(id='month-dropdown', placeholder='Select Month')
#         ], style={'width': '30%', 'display': 'inline-block', 'verticalAlign': 'top', 'margin': '10px'}),
#         html.Div([
#             html.Label("Select Week"),
#             dcc.Dropdown(id='week-dropdown', placeholder='Select Week')
#         ], style={'width': '30%', 'display': 'inline-block', 'verticalAlign': 'top', 'margin': '10px'}),
#         # Breakdown graphs arranged in two rows
#         html.Div([
#             html.Div([
#                 dcc.Graph(id='yearly-summary', config={'displayModeBar': True}, style={'height': '300px'}),
#                 html.Button("Expand", id="btn-expand-yearly", n_clicks=0,
#                             style={'position': 'absolute', 'bottom': '10px', 'right': '10px'})
#             ], className="graph-card", style={'width': '45%', 'display': 'inline-block', 
#                                                 'position': 'relative', 'margin': '10px'}),
#             html.Div([
#                 dcc.Graph(id='monthly-summary', config={'displayModeBar': True}, style={'height': '300px'}),
#                 html.Button("Expand", id="btn-expand-monthly", n_clicks=0,
#                             style={'position': 'absolute', 'bottom': '10px', 'right': '10px'})
#             ], className="graph-card", style={'width': '45%', 'display': 'inline-block', 
#                                                 'position': 'relative', 'margin': '10px'})
#         ], style={'textAlign': 'center'}),
#         html.Div([
#             html.Div([
#                 dcc.Graph(id='weekly-summary', config={'displayModeBar': True}, style={'height': '300px'}),
#                 html.Button("Expand", id="btn-expand-weekly", n_clicks=0,
#                             style={'position': 'absolute', 'bottom': '10px', 'right': '10px'})
#             ], className="graph-card", style={'width': '45%', 'display': 'inline-block', 
#                                                 'position': 'relative', 'margin': '10px'}),
#             html.Div([
#                 dcc.Graph(id='daily-summary', config={'displayModeBar': True}, style={'height': '300px'}),
#                 html.Button("Expand", id="btn-expand-daily", n_clicks=0,
#                             style={'position': 'absolute', 'bottom': '10px', 'right': '10px'})
#             ], className="graph-card", style={'width': '45%', 'display': 'inline-block', 
#                                                 'position': 'relative', 'margin': '10px'})
#         ], style={'textAlign': 'center'}),
#         # Hidden Stores for breakdown figures
#         dcc.Store(id='store-yearly-summary'),
#         dcc.Store(id='store-monthly-summary'),
#         dcc.Store(id='store-weekly-summary'),
#         dcc.Store(id='store-daily-summary'),
#         # Modals for breakdown analysis
#         dbc.Modal([
#             dbc.ModalHeader("Yearly Summary"),
#             dbc.ModalBody(dcc.Graph(id='modal-yearly-summary', style={'height': '600px'})),
#             dbc.ModalFooter(dbc.Button("Close", id="close-modal-yearly", className="ml-auto"))
#         ], id="modal-yearly", size="xl", is_open=False),
#         dbc.Modal([
#             dbc.ModalHeader("Monthly Summary"),
#             dbc.ModalBody(dcc.Graph(id='modal-monthly-summary', style={'height': '600px'})),
#             dbc.ModalFooter(dbc.Button("Close", id="close-modal-monthly", className="ml-auto"))
#         ], id="modal-monthly", size="xl", is_open=False),
#         dbc.Modal([
#             dbc.ModalHeader("Weekly Summary"),
#             dbc.ModalBody(dcc.Graph(id='modal-weekly-summary', style={'height': '600px'})),
#             dbc.ModalFooter(dbc.Button("Close", id="close-modal-weekly", className="ml-auto"))
#         ], id="modal-weekly", size="xl", is_open=False),
#         dbc.Modal([
#             dbc.ModalHeader("Daily Summary"),
#             dbc.ModalBody(dcc.Graph(id='modal-daily-summary', style={'height': '600px'})),
#             dbc.ModalFooter(dbc.Button("Close", id="close-modal-daily", className="ml-auto"))
#         ], id="modal-daily", size="xl", is_open=False)
#     ])
    

#     layout = html.Div([
#     html.H1("SpendWise", style={'textAlign': 'center', 'color': '#007BFF', 'fontSize': '40px', 'fontWeight': 'bold'}),
#     html.H2("Transaction Analysis Dashboard", style={'textAlign': 'center', 'color': '#28A745', 'fontSize': '30px', 'fontWeight': 'bold'}),
    
#     date_picker,
#     summary_container,
    
#     dcc.Tabs([
#         dcc.Tab(label="General Analysis", children=[general_tab], style={'backgroundColor': '#F8F9FA', 'fontWeight': 'bold'}),
#         dcc.Tab(label="Y_M_W_D Breakdown", children=[breakdown_tab], style={'backgroundColor': '#F8F9FA', 'fontWeight': 'bold'})
#     ])
# ])

#     return layout