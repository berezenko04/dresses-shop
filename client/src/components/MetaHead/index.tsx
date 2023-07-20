import { Helmet } from 'react-helmet'

type TMetaHeadProps = {
    title: string,
    desc: string
}

const MetaHead: React.FC<TMetaHeadProps> = ({ title, desc }) => {
    return (
        <Helmet>
            <title>Sandrela | {title}</title>
            <meta name="description" content={desc} />
        </Helmet>
    )
}

export default MetaHead