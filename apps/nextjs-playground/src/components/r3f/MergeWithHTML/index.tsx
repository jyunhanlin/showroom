// practice with https://www.awwwards.com/academy/course/merging-webgl-and-html-worlds
'use client';
import { useEffect } from 'react';

import styles from './merge-with-html.module.css';
import Sketch from './three/sketch';
import { assetPath } from '@/utils/assetPath';

export const MergeWithHTML = () => {
  useEffect(() => {
    new Sketch({
      dom: document.getElementById('canvas'),
    });
  }, []);

  return (
    <main>
      <div data-scroll>
        <div className={styles.page}>
          <header className={styles.header}>
            <h1 className={styles.h1}>Oceans</h1>
            <img src={`${assetPath}/img/merge-with-html/header.jpg`} alt="" />
          </header>

          <div className={styles.grid}>
            <div className={`${styles.item} ${styles.item_v}`}>
              <div className={styles.item__image}>
                <img src={`${assetPath}/img/merge-with-html/1.jpg`} alt="" />
                <div className={styles.item__meta}>December 23, 2020</div>
              </div>

              <h2 className={styles.item__title}>Octopus punches fish in the head (just because it can)</h2>
              <p>
                Octopuses sometimes partner with fish to hunt, but the partnership comes with risks (for the fish, that
                is).
              </p>
            </div>

            <div className={`${styles.item} ${styles.item_h}`}>
              <div className={styles.item__image}>
                <img src={`${assetPath}/img/merge-with-html/2.jpg`} alt="" />
                <div className={styles.item__meta}>December 01, 2020</div>
              </div>

              <h2 className={styles.item__title}>
                Newfound marine blob looks like &lsquo;party balloon&rsquo; with two strings, scientists say
              </h2>
              <p>This is the first species NOAA scientists have ever discovered from video footage alone.</p>
            </div>

            <div className={`${styles.item} ${styles.item_h}`}>
              <div className={styles.item__image}>
                <img src={`${assetPath}/img/merge-with-html/4.jpg`} alt="" />
                <div className={styles.item__meta}>November 26, 2020</div>
              </div>

              <h2 className={styles.item__title}>Swarm of eels breaks record</h2>
              <p>
                Before we start mining for precious metals in the darkness of the deep sea, we might try switching on
                the light first and observing our surroundings.
              </p>
            </div>

            <div className={`${styles.item} ${styles.item_v}`}>
              <div className={styles.item__image}>
                <img src={`${assetPath}/img/merge-with-html/3.jpg`} alt="" />
                <div className={styles.item__meta}>November 03, 2020</div>
              </div>

              <h2 className={styles.item__title}>Mantis shrimp punch down</h2>
              <p>Home-stealers fought the hardest for smaller-than-ideal dens.</p>
            </div>

            <div className={`${styles.item} ${styles.item_v}`}>
              <div className={styles.item__image}>
                <img src={`${assetPath}/img/merge-with-html/1.jpg`} alt="" />
                <div className={styles.item__meta}>October 05, 2020</div>
              </div>

              <h2 className={styles.item__title}>Megalodon&rsquo;s hugeness</h2>
              <p>Even among its extinct relatives, Megalodon was unequalled in length and mass.</p>
            </div>

            <div className={`${styles.item} ${styles.item_h}`}>
              <div className={styles.item__image}>
                <img src={`${assetPath}/img/merge-with-html/2.jpg`} alt="" />
                <div className={styles.item__meta}>July 27, 2020</div>
              </div>

              <h2 className={styles.item__title}>Adorable sunfish</h2>
              <p>Sunfish in the Molidae family are among the biggest fish in the world.</p>
            </div>

            <div className={`${styles.item} ${styles.item_h}`}>
              <div className={styles.item__image}>
                <img src={`${assetPath}/img/merge-with-html/4.jpg`} alt="" />
                <div className={styles.item__meta}>August 18, 2020</div>
              </div>

              <h2 className={styles.item__title}>Massive &lsquo;Darth Vader&rsquo; sea bug</h2>
              <p>The newly described species is one of the biggest isopods known to science.</p>
            </div>

            <div className={`${styles.item} ${styles.item_v}`}>
              <div className={styles.item__image}>
                <img src={`${assetPath}/img/merge-with-html/3.jpg`} alt="" />
                <div className={styles.item__meta}>June 01, 2020</div>
              </div>

              <h2 className={styles.item__title}>Scientists capture the world&rsquo;s deepest octopus</h2>
              <p>The octopus was found miles beneath the ocean surface.</p>
            </div>
          </div>
        </div>
      </div>

      <div id="canvas" className={styles.canvas} />
    </main>
  );
};
