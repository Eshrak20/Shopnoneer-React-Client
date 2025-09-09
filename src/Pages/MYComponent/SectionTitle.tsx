interface SectionTitleProps {
  heading: string;
  subHeading?: string; // optional if you don't always pass it
}
const SectionTitle: React.FC<SectionTitleProps> = ({ heading, subHeading }) => {
    return (
        <div className='text-center my-10'>
            <h2 className='text-3xl'>{heading}</h2>
            <p className='text-teal-600'>{subHeading}</p>
        </div>
    );
};

export default SectionTitle;
