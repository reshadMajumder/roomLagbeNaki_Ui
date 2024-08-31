import React from 'react'

function FilterBy() {
    return (
        <div>
            <div
                className="toolbox d-flex align-items-center mb-3 gap-2 border p-3"
            >
                <div className="d-flex flex-wrap">
                    <div className="d-flex align-items-center flex-nowrap">
                        <p className="mb-0 font-13 text-nowrap">Sort By:</p>
                        <select className="form-select ms-3 rounded-0">
                            <option value="menu_order" selected="selected">
                                Sort by New
                            </option>
                            <option value="popularity">Sort by popularity</option>
                            <option value="price">
                                Sort by price: low to high
                            </option>
                            <option value="price-desc">
                                Sort by price: high to low
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterBy