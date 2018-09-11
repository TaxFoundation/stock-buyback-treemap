import React from 'react';
import styled from 'styled-components';
import { color } from '../helpers';

const LegendContainer = styled.div`
  background-color: #eaeaea;
  display: grid;
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  grid-gap: 16px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  margin-top: 20px;
  padding: 16px;
`;

const LegendKey = styled.div`
  align-items: stretch;
  display: grid;
  grid-template-columns: repeat(${props => props.cols}, 1fr);
  grid-template-rows: auto;
  height: 100%;
  justify-items: stretch;
`;

const Legend = props => {
  const groups = props.data.children.map(node => node.data.id);
  const types = props.data.children[0].children
    .map(node => {
      return { name: node.data.name, id: node.data.group };
    })
    .sort((a, b) => {
      if (a.id === 'domestic' || a.id < b.id) {
        return -1;
      }
      if (a.id > b.id || b.id === 'domestic') {
        return 1;
      }
      return 0;
    });

  return (
    <LegendContainer>
      <div>
        <p>
          <strong>Notes:</strong> In law, the terms may have different meanings.
          In U.S. constitutional law, for instance, direct taxes refer to poll
          taxes and property taxes, which are based on simple existence or
          ownership. Indirect taxes are imposed on events, rights, privileges,
          and activities. Thus, a tax on the sale of property would be
          considered an indirect tax, whereas the tax on simply owning the
          property itself would be a direct tax.
        </p>
        <p>
          Governments may charge user fees, tolls, or other types of assessments
          in exchange of particular goods, services, or use of property. These
          are generally not considered taxes, as long as they are levied as
          payment for a direct benefit to the individual paying.
        </p>
      </div>
      <LegendKey cols={groups.length + 1}>
        {types.map(type => {
          const theGroups = groups.map(group => {
            return (
              <div
                key={`legend-${group}-${type.id}`}
                style={{
                  backgroundColor: color(group, type.id),
                  marginBottom: type.id === 'domestic' ? '20px' : 0,
                }}
              />
            );
          });

          theGroups.unshift(
            <strong
              style={{
                alignSelf: 'center',
                marginBottom: type.id === 'domestic' ? '20px' : 0,
                paddingRight: '10px',
                textAlign: 'right',
              }}
            >
              {type.name}
            </strong>
          );

          return theGroups;
        })}
      </LegendKey>
    </LegendContainer>
  );
};

export default Legend;
