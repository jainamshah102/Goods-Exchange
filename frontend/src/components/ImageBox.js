const ImageBox = ({ image, height, width, borderRadius = '1.078em' }) => {
  const REACT_APP_IMAGE_URL_PREFIX = 'https://res.cloudinary.com/longpos'
  return (
    <>
      <div
        style={{
          backgroundImage: image
            ? 'url(' + REACT_APP_IMAGE_URL_PREFIX + image + ')'
            : 'url(https://placeimg.com/400/250/tech)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: width || '100%',
          height: height || '250px',
          borderRadius: borderRadius,
        }}
      ></div>
    </>
  )
}

export default ImageBox
