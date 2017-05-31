import React, {Component} from 'react';

export default function Pagination({dataCountAll, dataCountOnPage, activePage, changePage}) {
    function getPageNumberButton(item) {
        if (!+item)
            return (<div key={item + (Math.random() * 100000)}>
                <button>{item}</button>
            </div>)
        return item === activePage ?
            <div key={item}>
                <button className="active"
                        onClick={() => {
                            changePage(item)
                        }}>{item}
                </button>
            </div> :
            <div key={item}>
                <button onClick={() => {
                    changePage(item)
                }}>{item}</button>
            </div>
    }

    const temp = dataCountAll / dataCountOnPage;
    let pageCont = ~~temp;
    if (temp - Math.floor(temp) > 0)
        pageCont++;
    let resultValue;
    if (pageCont <= 4 || (pageCont === 5 && activePage === 3)) {
        const pageNumbers = [];
        for (let i = 1; i <= pageCont; i++) {
            if (i === activePage)
                pageNumbers.push(<div key={i}>
                    <button className="active" onClick={() => {
                        changePage(i)
                    }}>{i}</button>
                </div>);
            else
                pageNumbers.push(<div key={i}>
                    <button onClick={() => {
                        changePage(i)
                    }}>{i}</button>
                </div>);
        }
        resultValue = pageNumbers;
    } else if (~[1, 2, 3, pageCont - 2, pageCont - 1, pageCont].indexOf(activePage)) {
        if (activePage === 3) {
            resultValue = [1, 2, 3, '...', pageCont - 1, pageCont].map(item => getPageNumberButton(item));
        } else if (activePage === pageCont - 2) {
            resultValue = [1, 2, '...', pageCont - 2, pageCont - 1, pageCont].map(item => getPageNumberButton(item));
        } else {
            resultValue = [1, 2, '...', pageCont - 1, pageCont].map(item => getPageNumberButton(item));
        }
    } else {
        resultValue = [1, 2, '...', activePage, '...', pageCont - 1, pageCont].map(item => getPageNumberButton(item))
    }
    return (<div className="pagination">
        <div>
            <button className="prev" onClick={() => {
                activePage > 1 ? changePage(activePage - 1) : {}
            }}>{"<"}
            </button>
        </div>
        <div>
            <button className="next" onClick={() => {
                activePage < pageCont ? changePage(activePage + 1) : {}
            }}>{">"}
            </button>
        </div>
        {resultValue}

    </div>);
}
