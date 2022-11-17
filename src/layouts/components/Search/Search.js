import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSpinner, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
//----------------------------------------------------------------
import styles from "./Search.module.scss";
import useDebounce from "~/hooks/useDebounced";
import Button from "~/components/Button";
import Wrapper from "~/components/Wrapper";
import httpRequest from "~/untils/httpRequest";
import SearchResult from "./SearchResult";
import { useDispatch } from "react-redux";
import { setCurrentTimeSong, setInfoCurrentSong, setSongId } from "~/redux/playerSlice";
const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState({});
    const [searchValue, setSearchValue] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    // const location = useLocation();
    // const locationPrevRef = useRef(location);

    const inputRef = useRef();
    const debouncedValue = useDebounce(searchValue, 800);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fecthApi = async () => {
            setLoading(true);
            const result = await httpRequest.get(`search`, {
                params: {
                    keyword: debouncedValue,
                },
            });
            // console.log(result.data);
            setSearchResult(result);
            setLoading(false);
        };

        fecthApi();
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue("");
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleSideResult = () => {
        setShowResult(false);
    };

    const handleChangeInput = (e) => {
        const searchValue = e.target.value;
        if (searchValue.startsWith(" ")) {
            return;
        }
        setSearchValue(searchValue);
    };

    const handleSong = (song) => {
        console.log(song);
        dispatch(setInfoCurrentSong(song));
        dispatch(setCurrentTimeSong(0));
        dispatch(setSongId(song?.encodeId));
    };
    return (
        // Using a wrapper <div> tag around the reference element solves
        //this by creating a new parentNode context.
        <div className={cx("wrapper")}>
            <Tippy
                interactive
                visible={showResult && searchResult}
                // visible
                zIndex="9"
                placement="bottom"
                render={(attrs) => (
                    <div tabIndex="-1" className={cx("search-result")} {...attrs}>
                        <Wrapper>
                            <h4 className={cx("search-heading")}>Kết quả</h4>
                            {searchResult?.err === 0 ? (
                                <SearchResult onPlaySong={handleSong} data={searchResult.data} value={searchValue} />
                            ) : (
                                <h5>Không có kết quả</h5>
                            )}
                        </Wrapper>
                    </div>
                )}
                onClickOutside={handleSideResult}
            >
                <div className={cx("search")}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        spellCheck={false}
                        placeholder="Tìm kiếm tài khoản và video"
                        onChange={handleChangeInput}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx("clear")} onClick={handleClear}>
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                    )}

                    {loading && <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />}

                    <Button className={cx("search-btn")} onMouseDown={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
