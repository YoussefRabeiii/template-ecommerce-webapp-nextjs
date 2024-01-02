import { Box, Text } from '@chakra-ui/react';
import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import Link from 'next/link';

import { CtfImage } from '@src/components/features/contentful/ctf-image';
import { FormatCurrency } from '@src/components/shared/format-currency';
import { PageProductFieldsFragment } from '@src/lib/__generated/sdk';

import styles from '@styles/ProductTile.module.css';
import Image from 'next/image';

export const ProductTile = ({
  name,
  featuredProductImage,
  price,
  slug,
  inStock,
  sys: { id: entryId },
}: PageProductFieldsFragment) => {
  const inspectorProps = useContentfulInspectorMode({ entryId });
  return slug ? (
    <div {...inspectorProps({ fieldId: 'featuredProductImage' })}>
      <div className={styles.card}>
        <span className={styles.imageContainer}>
          <span className={styles.imageBox}>
            <Image
              alt={featuredProductImage?.title ?? 'Product Image'}
              src={featuredProductImage?.url ?? ''}
              width={featuredProductImage?.width ?? 100}
              height={featuredProductImage?.height ?? 100}
              className={styles.image}
            />
          </span>

          <span className={styles.favorite}>
            {/* <Image alt="favorite" src="/icons/favorite.svg" width={16} height={16}/> */}
            {/* {isFavorite ? <p>favorite</p> : <p>not favorite</p>} */}
          </span>
        </span>

        <span className={styles.info}>
          <div className={styles.idgaf}>
            <h3 className={styles.title}>{name}</h3>
            {/* <h2 className={styles.description}>
            Product Description...
            
            {descriptionn}
				</h2> */}
            <h4 className={styles.price}>{price} LE</h4>
          </div>
          <h2 className={styles.rate}>
            {Array(5)
              .fill(undefined)
              .map((_, i) => (
                <span key={i} className={styles.star}>
                  {/* <Image alt="star" src="/icons/star.svg" width={16} height={16}/> */}✨
                  {/* TODO: Make it SVG */}
                </span>
              ))}
          </h2>
        </span>

        <span className={styles.cta}>
          {inStock ? (
            <>
              <span className={styles.buttons}>
                <button className={styles.button}>Add to Cart</button>
                <button className={styles.button}>Buy Now</button>
              </span>
            </>
          ) : (
            <>
              <span className={styles.buttons}>
                <button
                  className={`${styles.button} ${styles.outOfStock}`}
                  style={{ cursor: 'default' }}
                >
                  Out Of stock
                </button>

                <button className={styles.button}>Notify Me</button>
              </span>
            </>
          )}
        </span>
      </div>
      {/* <Box as={Link} href={slug}>
        {featuredProductImage && (
          <Box borderRadius={4} overflow="hidden">
            <CtfImage {...featuredProductImage} />
          </Box>
        )}
        {price && (
          <Text {...inspectorProps({ fieldId: 'price' })} mt={3} fontWeight="500">
            <FormatCurrency value={price} />
          </Text>
        )}
      </Box> */}
    </div>
  ) : null;
};
