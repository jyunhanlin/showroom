import styled from '@emotion/styled';
import { useEffect } from 'react';

import Sketch from './three/sketch';

const isProd = process.env.NODE_ENV === 'production';
const assetPath = isProd ? process.env.NEXT_PUBLIC_BASE_PATH : '';

export const MergeWithHTML = () => {
  useEffect(() => {
    new Sketch({
      dom: document.getElementById('canvas'),
    });
  }, []);

  return (
    <Main>
      <div data-scroll>
        <div className="page">
          <header>
            <h1>Oceans</h1>
            <img src={`${assetPath}/img/header.jpg`} alt="" />
          </header>

          <div className="grid">
            <div className="item item_v">
              <div className="item__image">
                <img src={`${assetPath}/img/1.jpg`} alt="" />
                <div className="item__meta">December 23, 2020</div>
              </div>

              <h2 className="item__title">Octopus punches fish in the head (just because it can)</h2>
              <p>
                Octopuses sometimes partner with fish to hunt, but the partnership comes with risks (for the fish, that
                is).
              </p>
            </div>

            <div className="item item_h">
              <div className="item__image">
                <img src={`${assetPath}/img/2.jpg`} alt="" />
                <div className="item__meta">December 01, 2020</div>
              </div>

              <h2 className="item__title">
                Newfound marine blob looks like &lsquo;party balloon&rsquo; with two strings, scientists say
              </h2>
              <p>This is the first species NOAA scientists have ever discovered from video footage alone.</p>
            </div>

            <div className="item item_h">
              <div className="item__image">
                <img src={`${assetPath}/img/4.jpg`} alt="" />
                <div className="item__meta">November 26, 2020</div>
              </div>

              <h2 className="item__title">Swarm of eels breaks record</h2>
              <p>
                Before we start mining for precious metals in the darkness of the deep sea, we might try switching on
                the light first and observing our surroundings.
              </p>
            </div>

            <div className="item item_v">
              <div className="item__image">
                <img src={`${assetPath}/img/3.jpg`} alt="" />
                <div className="item__meta">November 03, 2020</div>
              </div>

              <h2 className="item__title">Mantis shrimp punch down</h2>
              <p>Home-stealers fought the hardest for smaller-than-ideal dens.</p>
            </div>

            <div className="item item_v">
              <div className="item__image">
                <img src={`${assetPath}/img/1.jpg`} alt="" />
                <div className="item__meta">October 05, 2020</div>
              </div>

              <h2 className="item__title">Megalodon&rsquo;s hugeness</h2>
              <p>Even among its extinct relatives, Megalodon was unequalled in length and mass.</p>
            </div>

            <div className="item item_h">
              <div className="item__image">
                <img src={`${assetPath}/img/2.jpg`} alt="" />
                <div className="item__meta">July 27, 2020</div>
              </div>

              <h2 className="item__title">Adorable sunfish</h2>
              <p>Sunfish in the Molidae family are among the biggest fish in the world.</p>
            </div>

            <div className="item item_h">
              <div className="item__image">
                <img src={`${assetPath}/img/4.jpg`} alt="" />
                <div className="item__meta">August 18, 2020</div>
              </div>

              <h2 className="item__title">Massive &lsquo;Darth Vader&rsquo; sea bug</h2>
              <p>The newly described species is one of the biggest isopods known to science.</p>
            </div>

            <div className="item item_v">
              <div className="item__image">
                <img src={`${assetPath}/img/3.jpg`} alt="" />
                <div className="item__meta">June 01, 2020</div>
              </div>

              <h2 className="item__title">Scientists capture the world&rsquo;s deepest octopus</h2>
              <p>The octopus was found miles beneath the ocean surface.</p>
            </div>
          </div>
        </div>
      </div>

      <div id="canvas" />
    </Main>
  );
};

const Main = styled.main`
  .page {
    width: min(90%, 1200px);
    margin: 0 auto;
    /* border: 1px solid #000; */
  }
  /* header */

  header {
    margin-bottom: 5em;
    position: relative;
  }
  h1 {
    font-size: 260px;
    line-height: 1;
    padding: 0.5em 0;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #047582;
    mix-blend-mode: color-burn;
    font-size: 18vw;
  }
  header img {
    max-width: 100%;
    display: block;
  }
  h1,
  h2 {
    font-weight: normal;
  }

  /* grid */
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2em 0;
  }

  .item {
    align-self: center;
    justify-self: center;
    text-decoration: none;
  }
  .item:nth-of-type(odd) {
    justify-self: start;
  }
  .item:nth-of-type(even) {
    justify-self: end;
  }
  .item img {
    width: 100%;
    display: block;
    /* opacity: 0; */
  }
  .item__image {
    position: relative;
    margin-bottom: 0.6em;
  }
  .item__meta {
    position: absolute;
    left: -0.4em;
    bottom: 0.4em;
    transform-origin: 0 100%;
    transform: rotate(-90deg);
    text-transform: uppercase;
    font-size: 80%;
  }
  .item__title {
    font-size: 40px;
    line-height: 1.2;
    margin-bottom: 0.4em;
  }
  .item_p {
    line-height: 1.4;
    font-size: 1em;
  }
  .item_h {
    width: 100%;
  }
  .item_v {
    width: 80%;
  }

  @media (max-width: 600px) {
    .grid {
      display: block;
    }
    .item_v,
    .item_h {
      width: auto;
      margin-bottom: 3em;
    }
    .item img {
      width: 100%;
      max-width: none;
    }
  }

  #canvas {
    height: 100vh;
    width: 100vw;
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
  }
`;
